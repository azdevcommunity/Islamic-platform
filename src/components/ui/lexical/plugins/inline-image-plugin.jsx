/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical"
import { $createInlineImageNode } from "../nodes/inline-image-node"

export const INSERT_INLINE_IMAGE_COMMAND = "INSERT_INLINE_IMAGE_COMMAND"

export function InlineImagePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_INLINE_IMAGE_COMMAND,
      (payload) => {
        const { src, altText, width, height } = payload
        const inlineImageNode = $createInlineImageNode({
          src,
          altText,
          width,
          height,
        })
        $insertNodes([inlineImageNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

// Simple InsertInlineImageDialog component
export function InsertInlineImageDialog({ activeEditor, onClose }) {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")

  const handleInsert = () => {
    if (src) {
      activeEditor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, {
        altText,
        src,
      })
      onClose()
    }
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <label htmlFor="inline-image-url">Image URL</label>
        <input
          id="inline-image-url"
          type="text"
          placeholder="Enter image URL"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="inline-alt-text">Alt Text</label>
        <input
          id="inline-alt-text"
          type="text"
          placeholder="Enter alt text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <button
        onClick={handleInsert}
        disabled={!src}
        className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Insert Inline Image
      </button>
    </div>
  )
}