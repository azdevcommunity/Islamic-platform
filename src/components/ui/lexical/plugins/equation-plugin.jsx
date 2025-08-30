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
import { $createEquationNode } from "../nodes/equation-node"

export const INSERT_EQUATION_COMMAND = "INSERT_EQUATION_COMMAND"

export function EquationPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_EQUATION_COMMAND,
      (payload) => {
        const { equation, inline } = payload
        const equationNode = $createEquationNode(equation, inline)
        $insertNodes([equationNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}