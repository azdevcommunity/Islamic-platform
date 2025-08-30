/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useCallback, useRef } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { $getNodeByKey, $getSelection, $isNodeSelection } from "lexical"

export default function InlineImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
}) {
  const imageRef = useRef(null)
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey)
  const [editor] = useLexicalComposerContext()

  const onClick = useCallback(
    (payload) => {
      const event = payload

      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected)
        } else {
          clearSelection()
          setSelected(true)
        }
        return true
      }

      return false
    },
    [isSelected, setSelected, clearSelection]
  )

  const onDelete = useCallback(
    (payload) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event = payload
        event.preventDefault()
        const node = $getNodeByKey(nodeKey)
        if (node) {
          node.remove()
          return true
        }
      }
      return false
    },
    [isSelected, nodeKey]
  )

  return (
    <img
      className={isSelected ? "focused" : null}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height: height || "auto",
        maxWidth: "100%",
        width: width || "auto",
        display: "inline-block",
        verticalAlign: "middle",
      }}
      draggable="false"
      onClick={onClick}
    />
  )
}