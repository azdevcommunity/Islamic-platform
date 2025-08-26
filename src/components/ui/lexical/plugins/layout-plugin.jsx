/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes, COMMAND_PRIORITY_EDITOR, $createParagraphNode } from "lexical"
import { $createLayoutContainerNode } from "../nodes/layout-container-node"
import { $createLayoutItemNode } from "../nodes/layout-item-node"

export const INSERT_LAYOUT_COMMAND = "INSERT_LAYOUT_COMMAND"

export function LayoutPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_LAYOUT_COMMAND,
      (payload) => {
        const { columns = 2 } = payload || {}
        
        // Create template columns string (equal width columns)
        const templateColumns = Array(columns).fill("1fr").join(" ")
        
        const containerNode = $createLayoutContainerNode(templateColumns)
        
        // Create layout items
        for (let i = 0; i < columns; i++) {
          const itemNode = $createLayoutItemNode()
          itemNode.append($createParagraphNode())
          containerNode.append(itemNode)
        }
        
        $insertNodes([containerNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

// Simple InsertLayoutDialog component
export function InsertLayoutDialog({ activeEditor, onClose }) {
  const insertLayout = (template) => {
    activeEditor.dispatchCommand(INSERT_LAYOUT_COMMAND, template)
    onClose()
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <button
          onClick={() => insertLayout("1fr 1fr")}
          className="p-2 border rounded hover:bg-gray-100"
        >
          Two Columns
        </button>
        <button
          onClick={() => insertLayout("1fr 1fr 1fr")}
          className="p-2 border rounded hover:bg-gray-100"
        >
          Three Columns
        </button>
        <button
          onClick={() => insertLayout("2fr 1fr")}
          className="p-2 border rounded hover:bg-gray-100"
        >
          Two Columns (2:1)
        </button>
      </div>
    </div>
  )
}