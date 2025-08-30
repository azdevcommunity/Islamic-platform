/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical"
import { $createExcalidrawNode } from "../nodes/excalidraw-node"

export const INSERT_EXCALIDRAW_COMMAND = "INSERT_EXCALIDRAW_COMMAND"

export function ExcalidrawPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_EXCALIDRAW_COMMAND,
      (payload) => {
        const excalidrawNode = $createExcalidrawNode()
        $insertNodes([excalidrawNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}