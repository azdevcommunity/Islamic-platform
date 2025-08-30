"use client"

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback, useEffect, useRef, useState } from "react"
import {
  $createLinkNode,
  $isAutoLinkNode,
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
} from "@lexical/link"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $findMatchingParent, mergeRegister } from "@lexical/utils"
import {
  $createTextNode,
  $getSelection,
  $isLineBreakNode,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { createPortal } from "react-dom"

import { useFloatingLinkContext } from "../context/floating-link-context"
import { getSelectedNode } from "../utils/get-selected-node"

const VERTICAL_GAP = 10
const HORIZONTAL_OFFSET = 5

function setFloatingElemPositionForLinkEditor(targetRect, floatingElem, anchorElem) {
  const scrollerElem = anchorElem.parentElement

  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = "0"
    floatingElem.style.transform = "translate(-10000px, -10000px)"
    return
  }

  const floatingElemRect = floatingElem.getBoundingClientRect()
  const anchorElementRect = anchorElem.getBoundingClientRect()
  const editorScrollerRect = scrollerElem.getBoundingClientRect()

  let top = targetRect.top - VERTICAL_GAP
  let left = targetRect.left - HORIZONTAL_OFFSET

  if (top < editorScrollerRect.top) {
    top += floatingElemRect.height + targetRect.height + VERTICAL_GAP * 2
  }

  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - HORIZONTAL_OFFSET
  }

  top -= anchorElementRect.top
  left -= anchorElementRect.left

  floatingElem.style.opacity = "1"
  floatingElem.style.transform = `translate(${left}px, ${top}px)`
}

const SUPPORTED_URL_PROTOCOLS = new Set([
  "http:",
  "https:",
  "mailto:",
  "sms:",
  "tel:",
])

function sanitizeUrl(url) {
  try {
    const parsedUrl = new URL(url)
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return "about:blank"
    }
  } catch {
    return url
  }
  return url
}

function FloatingLinkEditor({
  editor,
  isLink,
  setIsLink,
  anchorElem,
  isLinkEditMode,
  setIsLinkEditMode,
}) {
  const editorRef = useRef(null)
  const inputRef = useRef(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [editedLinkUrl, setEditedLinkUrl] = useState("https://")
  const [linkText, setLinkText] = useState("")
  const [editedLinkText, setEditedLinkText] = useState("")
  const [lastSelection, setLastSelection] = useState(null)

  const $updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const linkParent = $findMatchingParent(node, $isLinkNode)
      const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode)

      if (linkParent) {
        setLinkUrl(linkParent.getURL())
        setLinkText(linkParent.getTextContent())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
        setLinkText(node.getTextContent())
      } else if (autoLinkParent) {
        setLinkUrl(autoLinkParent.getURL())
        setLinkText(autoLinkParent.getTextContent())
        // Convert AutoLink to Link for better editing
        console.log("Converting AutoLink to LinkNode for editing")
        editor.update(() => {
          const linkNode = $createLinkNode(autoLinkParent.getURL())
          const textContent = autoLinkParent.getTextContent()
          linkNode.append($createTextNode(textContent))
          autoLinkParent.replace(linkNode)
        })
      } else if ($isAutoLinkNode(node)) {
        setLinkUrl(node.getURL())
        setLinkText(node.getTextContent())
        // Convert AutoLink to Link for better editing
        console.log("Converting AutoLink node to LinkNode for editing")
        editor.update(() => {
          const linkNode = $createLinkNode(node.getURL())
          const textContent = node.getTextContent()
          linkNode.append($createTextNode(textContent))
          node.replace(linkNode)
        })
      } else {
        setLinkUrl("")
        setLinkText("")
      }
      if (isLinkEditMode) {
        setEditedLinkUrl(linkUrl)
      }
    }
    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()

    if (
      selection !== null &&
      nativeSelection !== null &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode) &&
      editor.isEditable()
    ) {
      const domRect = nativeSelection.focusNode?.parentElement?.getBoundingClientRect()
      if (domRect) {
        domRect.y += 40
        setFloatingElemPositionForLinkEditor(domRect, editorElem, anchorElem)
      }
      setLastSelection(selection)
    } else if (!activeElement || (activeElement.className !== "link-input" && !isLinkEditMode)) {
      if (rootElement !== null) {
        setFloatingElemPositionForLinkEditor(null, editorElem, anchorElem)
      }
      setLastSelection(null)
      setLinkUrl("")
    }

    return true
  }, [anchorElem, editor, setIsLinkEditMode, isLinkEditMode, linkUrl])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        $updateLinkEditor()
      })
    }

    window.addEventListener("resize", update)

    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update)
    }

    return () => {
      window.removeEventListener("resize", update)

      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update)
      }
    }
  }, [anchorElem.parentElement, editor, $updateLinkEditor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateLinkEditor()
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isLink) {
            setIsLink(false)
            return true
          }
          return false
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [editor, $updateLinkEditor, setIsLink, isLink])

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateLinkEditor()
    })
  }, [editor, $updateLinkEditor])

  useEffect(() => {
    console.log("FloatingLinkEditor useEffect - isLinkEditMode:", isLinkEditMode, "inputRef.current:", inputRef.current)
    if (isLinkEditMode && inputRef.current) {
      inputRef.current.focus()
      setIsLink(true)

      // Set initial values for editing
      setEditedLinkUrl(linkUrl || "https://")
      setEditedLinkText(linkText || "")

      // Position the editor when link edit mode starts
      editor.getEditorState().read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const nativeSelection = window.getSelection()
          if (nativeSelection && nativeSelection.focusNode) {
            const domRect = nativeSelection.focusNode.parentElement?.getBoundingClientRect()
            if (domRect && editorRef.current) {
              domRect.y += 40
              setFloatingElemPositionForLinkEditor(domRect, editorRef.current, anchorElem)
            }
          }
        }
      })
    }
  }, [isLinkEditMode, editor, anchorElem, linkUrl, linkText])

  const monitorInputInteraction = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleLinkSubmission()
    } else if (event.key === "Escape") {
      event.preventDefault()
      setIsLinkEditMode(false)
    }
  }

  const handleLinkSubmission = () => {
    console.log("=== LINK SUBMISSION START ===")
    console.log("handleLinkSubmission called - editedLinkUrl:", editedLinkUrl, "lastSelection:", lastSelection)

    if (editedLinkUrl !== "" && editedLinkUrl !== "https://") {
      console.log("editedLinkUrl is valid:", editedLinkUrl)

      // Focus editor and create link manually
      editor.focus()

      editor.update(() => {
        const selection = $getSelection()
        console.log("Current selection in update:", selection)

        if ($isRangeSelection(selection)) {
          const selectedText = selection.getTextContent()
          console.log("Selected text:", selectedText)

          // Use edited text if provided, otherwise use selected text
          const finalText = editedLinkText.trim() || selectedText || "Link"

          if (selectedText.length > 0 || editedLinkText.trim()) {
            // Create link node manually
            console.log("Creating LinkNode manually with text:", finalText)
            const linkNode = $createLinkNode(sanitizeUrl(editedLinkUrl))
            selection.insertNodes([linkNode])

            // Insert the final text into the link
            linkNode.append($createTextNode(finalText))
            console.log("Link created successfully with text:", finalText)
          } else {
            console.log("No text available, cannot create link")
          }
        } else {
          console.log("No range selection available")
        }
      })
    }

    setEditedLinkUrl("https://")
    setEditedLinkText("")
    setIsLinkEditMode(false)

    console.log("=== LINK SUBMISSION END ===")
  }

  console.log("FloatingLinkEditor render - isLink:", isLink, "isLinkEditMode:", isLinkEditMode, "editorRef.current:", editorRef.current)

  return (
    <div
      ref={editorRef}
      className="absolute top-0 left-0 w-full max-w-sm rounded-md opacity-0 shadow-md z-50"

    >


      {isLinkEditMode ? (
        <div className="flex flex-col space-y-2 rounded-md border p-2 bg-white shadow-lg min-w-80">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600 w-12">Text:</span>
            <input
              value={editedLinkText}
              onChange={(event) => setEditedLinkText(event.target.value)}
              onKeyDown={monitorInputInteraction}
              className="flex-grow px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Link metni..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600 w-12">URL:</span>
            <input
              ref={inputRef}
              value={editedLinkUrl}
              onChange={(event) => setEditedLinkUrl(event.target.value)}
              onKeyDown={monitorInputInteraction}
              className="flex-grow px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 link-input"
              placeholder="URL girin..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsLinkEditMode(false)
                setIsLink(false)
              }}
              className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕ İptal
            </button>
            <button
              onClick={handleLinkSubmission}
              className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
            >
              ✓ Kaydet
            </button>
          </div>
        </div>
      ) : isLink ? (
        <div className="flex items-center justify-between rounded-md border p-1 pl-2 bg-white shadow-lg">
          <a
            href={sanitizeUrl(linkUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-blue-600 hover:text-blue-800"
          >
            {linkUrl}
          </a>
          <div className="flex">
            <button
              onClick={() => {
                setEditedLinkUrl(linkUrl)
                setIsLinkEditMode(true)
              }}
              className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✏️
            </button>
            <button
              onClick={() => {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
              }}
              className="px-2 py-1 text-sm text-red-600 hover:text-red-800 focus:outline-none"
            >
              🗑️
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function useFloatingLinkEditorToolbar(
  editor,
  anchorElem,
  isLinkEditMode,
  setIsLinkEditMode
) {
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isLink, setIsLink] = useState(false)

  console.log("useFloatingLinkEditorToolbar - isLinkEditMode:", isLinkEditMode, "isLink:", isLink, "anchorElem:", anchorElem)

  useEffect(() => {
    function $updateToolbar() {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const focusNode = getSelectedNode(selection)
        const focusLinkNode = $findMatchingParent(focusNode, $isLinkNode)
        const focusAutoLinkNode = $findMatchingParent(
          focusNode,
          $isAutoLinkNode
        )
        if (!(focusLinkNode || focusAutoLinkNode)) {
          setIsLink(false)
          return
        }
        const badNode = selection
          .getNodes()
          .filter((node) => !$isLineBreakNode(node))
          .find((node) => {
            const linkNode = $findMatchingParent(node, $isLinkNode)
            const autoLinkNode = $findMatchingParent(node, $isAutoLinkNode)
            return (
              (focusLinkNode && !focusLinkNode.is(linkNode)) ||
              (linkNode && !linkNode.is(focusLinkNode)) ||
              (focusAutoLinkNode && !focusAutoLinkNode.is(autoLinkNode)) ||
              (autoLinkNode &&
                (!autoLinkNode.is(focusAutoLinkNode) ||
                  autoLinkNode.getIsUnlinked()))
            )
          })

        if (!badNode) {
          setIsLink(true)
        } else {
          setIsLink(false)
        }
      }
    }
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          $updateToolbar()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection)
            const linkNode = $findMatchingParent(node, $isLinkNode)
            if ($isLinkNode(linkNode) && (payload.metaKey || payload.ctrlKey)) {
              window.open(linkNode.getURL(), "_blank")
              return true
            }
          }
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor])

  if (!anchorElem) {
    console.log("useFloatingLinkEditorToolbar - anchorElem is null, returning null")
    return null
  }

  console.log("useFloatingLinkEditorToolbar - creating portal with isLinkEditMode:", isLinkEditMode, "isLink:", isLink)

  return createPortal(
    <FloatingLinkEditor
      editor={activeEditor}
      isLink={isLink}
      anchorElem={anchorElem}
      setIsLink={setIsLink}
      isLinkEditMode={isLinkEditMode}
      setIsLinkEditMode={setIsLinkEditMode}
    />,
    anchorElem
  )
}

export function FloatingLinkEditorPlugin({ anchorElem }) {
  const [editor] = useLexicalComposerContext()
  const { isLinkEditMode, setIsLinkEditMode } = useFloatingLinkContext()

  console.log("FloatingLinkEditorPlugin - isLinkEditMode:", isLinkEditMode, "anchorElem:", anchorElem)

  return useFloatingLinkEditorToolbar(
    editor,
    anchorElem,
    isLinkEditMode,
    setIsLinkEditMode
  )
}