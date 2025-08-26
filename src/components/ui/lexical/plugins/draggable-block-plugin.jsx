/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getNearestNodeFromDOMNode,
  $getNodeByKey,
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
} from "lexical"

export function DraggableBlockPlugin({ anchorElem = document.body }) {
  const [editor] = useLexicalComposerContext()
  const menuRef = useRef(null)
  const targetLineRef = useRef(null)
  const isDraggingBlockRef = useRef(false)
  const [draggableBlockElem, setDraggableBlockElem] = useState(null)

  useEffect(() => {
    function onMouseMove(event) {
      const target = event.target
      if (!target) {
        setDraggableBlockElem(null)
        return
      }

      if (isDraggingBlockRef.current) {
        return
      }

      const _draggableBlockElem = getBlockElement(anchorElem, editor, event, true)

      setDraggableBlockElem(_draggableBlockElem)
    }

    function onMouseLeave() {
      setDraggableBlockElem(null)
    }

    if (!anchorElem) {
      return
    }

    anchorElem.addEventListener("mousemove", onMouseMove)
    anchorElem.addEventListener("mouseleave", onMouseLeave)

    return () => {
      if (anchorElem) {
        anchorElem.removeEventListener("mousemove", onMouseMove)
        anchorElem.removeEventListener("mouseleave", onMouseLeave)
      }
    }
  }, [anchorElem, editor])

  useEffect(() => {
    if (menuRef.current) {
      if (draggableBlockElem) {
        const { top, left } = draggableBlockElem.getBoundingClientRect()
        menuRef.current.style.opacity = "1"
        menuRef.current.style.transform = `translate(${left - 40}px, ${top}px)`
      } else {
        menuRef.current.style.opacity = "0"
        menuRef.current.style.transform = "translate(-10000px, -10000px)"
      }
    }
  }, [draggableBlockElem])

  useEffect(() => {
    function onDragover(event) {
      const [isFileTransfer] = eventFiles(event)
      if (isFileTransfer) {
        return false
      }
      const { pageY, target } = event
      if (!target) {
        return false
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event, false)
      const targetLineElem = targetLineRef.current
      if (targetBlockElem === null || targetLineElem === null) {
        return false
      }
      const { top: targetBlockElemTop, height: targetBlockElemHeight } =
        targetBlockElem.getBoundingClientRect()
      const shouldInsertLineAfterBlock = pageY - targetBlockElemTop > targetBlockElemHeight / 2

      if (shouldInsertLineAfterBlock) {
        targetLineElem.style.top = `${
          targetBlockElemTop + targetBlockElemHeight + window.pageYOffset
        }px`
      } else {
        targetLineElem.style.top = `${targetBlockElemTop + window.pageYOffset}px`
      }

      const container = anchorElem
      const { left: containerLeft, width: containerWidth } = container.getBoundingClientRect()

      const { width: targetLineElemWidth } = targetLineElem.getBoundingClientRect()

      const left = containerLeft + (containerWidth - targetLineElemWidth) / 2
      targetLineElem.style.left = `${left + window.pageXOffset}px`
      targetLineElem.style.opacity = "1"

      event.preventDefault()
      return true
    }

    function onDrop(event) {
      const [isFileTransfer] = eventFiles(event)
      if (isFileTransfer) {
        return false
      }
      const { target, dataTransfer, pageY } = event
      const dragData = dataTransfer?.getData("application/x-lexical-drag")
      const draggedNode = dragData ? JSON.parse(dragData) : null
      if (!target || !draggedNode) {
        return false
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event, false)
      if (!targetBlockElem) {
        return false
      }
      const { top: targetBlockElemTop, height: targetBlockElemHeight } =
        targetBlockElem.getBoundingClientRect()
      const shouldInsertAfter = pageY - targetBlockElemTop > targetBlockElemHeight / 2

      editor.update(() => {
        const targetNode = $getNearestNodeFromDOMNode(targetBlockElem)
        if (!targetNode) {
          return
        }
        const draggedLexicalNode = $getNodeByKey(draggedNode.key)
        if (!draggedLexicalNode) {
          return
        }

        if (shouldInsertAfter) {
          targetNode.insertAfter(draggedLexicalNode)
        } else {
          targetNode.insertBefore(draggedLexicalNode)
        }
      })
      const targetLineElem = targetLineRef.current
      if (targetLineElem) {
        targetLineElem.style.opacity = "0"
      }
      event.preventDefault()
      return true
    }

    const unregisterDragover = editor.registerCommand(DRAGOVER_COMMAND, onDragover, COMMAND_PRIORITY_LOW)
    const unregisterDrop = editor.registerCommand(DROP_COMMAND, onDrop, COMMAND_PRIORITY_HIGH)

    return () => {
      unregisterDragover()
      unregisterDrop()
    }
  }, [anchorElem, editor])

  function onDragStart(event) {
    const dataTransfer = event.dataTransfer
    if (!dataTransfer || !draggableBlockElem) {
      return
    }
    setDraggableBlockElem(null)
    isDraggingBlockRef.current = true
    const draggedNode = $getNearestNodeFromDOMNode(draggableBlockElem)
    if (draggedNode) {
      dataTransfer.setData(
        "application/x-lexical-drag",
        JSON.stringify({
          key: draggedNode.getKey(),
        })
      )
    }
  }

  function onDragEnd() {
    isDraggingBlockRef.current = false
  }

  return (
    <>
      <div className="icon draggable-block-menu" ref={menuRef}>
        <div
          className="icon"
          draggable="true"
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <i className="icon drag-handle" />
        </div>
      </div>
      <div className="draggable-block-target-line" ref={targetLineRef} />
    </>
  )
}

function getBlockElement(anchorElem, editor, event, useEdgeAsDefault) {
  const anchorElementRect = anchorElem.getBoundingClientRect()
  const topLevelNodeKeys = editor.getEditorState().read(() => $getRoot().getChildrenKeys())

  let blockElem = null

  editor.getEditorState().read(() => {
    if (useEdgeAsDefault) {
      const [firstNode] = $getRoot().getChildren()
      const firstNodeKey = firstNode?.getKey()
      if (firstNodeKey) {
        blockElem = editor.getElementByKey(firstNodeKey)
      }
    }

    const { pageX, pageY } = event
    for (let i = 0; i < topLevelNodeKeys.length; i++) {
      const nodeKey = topLevelNodeKeys[i]
      const elem = editor.getElementByKey(nodeKey)
      if (elem === null) {
        continue
      }
      const { top, left, bottom, right } = elem.getBoundingClientRect()
      const isOnTopSide = top >= anchorElementRect.top && top <= anchorElementRect.bottom
      const isOnBottomSide = bottom >= anchorElementRect.top && bottom <= anchorElementRect.bottom
      const isOnLeftSide = left >= anchorElementRect.left && left <= anchorElementRect.right
      const isOnRightSide = right >= anchorElementRect.left && right <= anchorElementRect.right

      const isIntersecting =
        (isOnTopSide || isOnBottomSide) && (isOnLeftSide || isOnRightSide)

      if (isIntersecting && pageY >= top && pageY <= bottom && pageX >= left && pageX <= right) {
        blockElem = elem
        break
      }
    }
  })

  return blockElem
}

function eventFiles(event) {
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return [false]
  }
  return [Array.from(dataTransfer.types).includes("Files")]
}