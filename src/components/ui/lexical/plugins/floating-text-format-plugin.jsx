/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback, useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical"
import { mergeRegister } from "@lexical/utils"

export function FloatingTextFormatPlugin({ anchorElem = document.body }) {
  const [editor] = useLexicalComposerContext()
  const popupCharStylesEditorRef = useRef(null)
  const [isText, setIsText] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return
      }
      const selection = $getSelection()
      const popupCharStylesEditorElem = popupCharStylesEditorRef.current
      const nativeSelection = window.getSelection()

      if (popupCharStylesEditorElem === null) {
        return
      }

      const rootElement = editor.getRootElement()

      if (
        selection !== null &&
        nativeSelection !== null &&
        !nativeSelection.isCollapsed &&
        rootElement !== null &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        const rangeRect = nativeSelection.getRangeAt(0).getBoundingClientRect()

        setIsText($isRangeSelection(selection))
        setIsBold(selection.hasFormat("bold"))
        setIsItalic(selection.hasFormat("italic"))
        setIsUnderline(selection.hasFormat("underline"))
        setIsStrikethrough(selection.hasFormat("strikethrough"))

        const { top, left, width } = rangeRect
        popupCharStylesEditorElem.style.opacity = "1"
        popupCharStylesEditorElem.style.top = `${top + window.pageYOffset - 10}px`
        popupCharStylesEditorElem.style.left = `${
          left + window.pageXOffset - popupCharStylesEditorElem.offsetWidth / 2 + width / 2
        }px`
      } else {
        popupCharStylesEditorElem.style.opacity = "0"
        popupCharStylesEditorElem.style.top = "-1000px"
        popupCharStylesEditorElem.style.left = "-1000px"
      }
    })
  }, [editor])

  useEffect(() => {
    const scrollerElem = anchorElem?.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updatePopup()
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
  }, [anchorElem?.parentElement, editor, updatePopup])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup()
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updatePopup()
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, updatePopup])

  if (!isText) {
    return null
  }

  return (
    <div ref={popupCharStylesEditorRef} className="floating-text-format-popup">
      <button
        className={`popup-item spaced ${isBold ? "active" : ""}`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }}
        aria-label="Format text as bold"
      >
        <i className="format bold" />
      </button>
      <button
        className={`popup-item spaced ${isItalic ? "active" : ""}`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
        aria-label="Format text as italics"
      >
        <i className="format italic" />
      </button>
      <button
        className={`popup-item spaced ${isUnderline ? "active" : ""}`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }}
        aria-label="Format text to underlined"
      >
        <i className="format underline" />
      </button>
      <button
        className={`popup-item spaced ${isStrikethrough ? "active" : ""}`}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }}
        aria-label="Format text with a strikethrough"
      >
        <i className="format strikethrough" />
      </button>
    </div>
  )
}

// Export FloatingTextFormatToolbarPlugin as an alias
export const FloatingTextFormatToolbarPlugin = FloatingTextFormatPlugin