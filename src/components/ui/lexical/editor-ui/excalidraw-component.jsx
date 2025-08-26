/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getNodeByKey } from "lexical"

export default function ExcalidrawComponent({ data, nodeKey }) {
  const [editor] = useLexicalComposerContext()
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    // Here you would integrate with Excalidraw
    // For now, just show a placeholder
  }

  const handleSave = (newData) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if (node) {
        node.setData(newData)
      }
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="excalidraw-editor">
        <div className="excalidraw-placeholder">
          <p>Excalidraw Editor Placeholder</p>
          <button onClick={() => handleSave("{}")}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="excalidraw-container" onClick={handleEdit}>
      <div className="excalidraw-placeholder">
        <p>Click to edit drawing</p>
        <p>📝 Excalidraw</p>
      </div>
    </div>
  )
}