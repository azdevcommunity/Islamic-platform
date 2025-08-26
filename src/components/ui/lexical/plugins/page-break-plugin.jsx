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
import { $createPageBreakNode } from "../nodes/page-break-node"

export const INSERT_PAGE_BREAK_COMMAND = "INSERT_PAGE_BREAK_COMMAND"
export const INSERT_PAGE_BREAK = INSERT_PAGE_BREAK_COMMAND // Alias for compatibility

export function PageBreakPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_PAGE_BREAK_COMMAND,
      (payload) => {
        const pageBreakNode = $createPageBreakNode()
        $insertNodes([pageBreakNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}