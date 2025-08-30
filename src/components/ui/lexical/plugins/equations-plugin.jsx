"use client"

import { useCallback, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement } from "@lexical/utils"

import "katex/dist/katex.css"

import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical"

import {
  $createEquationNode,
  EquationNode,
} from "@/components/ui/lexical/nodes/equation-node"

export const INSERT_EQUATION_COMMAND = createCommand("INSERT_EQUATION_COMMAND")

export function InsertEquationDialog({ activeEditor, onClose }) {
  const onEquationConfirm = useCallback(
    (equation, inline) => {
      activeEditor.dispatchCommand(INSERT_EQUATION_COMMAND, {
        equation,
        inline,
      })
      onClose()
    },
    [activeEditor, onClose]
  )

  // Simple equation input for now
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter equation (e.g., E=mc^2)"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEquationConfirm(e.target.value, false)
          }
        }}
        className="w-full p-2 border rounded"
      />
    </div>
  )
}

export function EquationsPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([EquationNode])) {
      throw new Error(
        "EquationsPlugins: EquationsNode not registered on editor"
      )
    }

    return editor.registerCommand(
      INSERT_EQUATION_COMMAND,
      (payload) => {
        const { equation, inline } = payload
        const equationNode = $createEquationNode(equation, inline)

        $insertNodes([equationNode])
        if ($isRootOrShadowRoot(equationNode.getParentOrThrow())) {
          $wrapNodeInElement(equationNode, $createParagraphNode).selectEnd()
        }

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}