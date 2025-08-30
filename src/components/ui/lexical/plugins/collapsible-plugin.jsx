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
import { $createCollapsibleContainerNode } from "../nodes/collapsible-container-node"
import { $createCollapsibleTitleNode } from "../nodes/collapsible-title-node"
import { $createCollapsibleContentNode } from "../nodes/collapsible-content-node"
import { $createParagraphNode } from "lexical"

export const INSERT_COLLAPSIBLE_COMMAND = "INSERT_COLLAPSIBLE_COMMAND"

export function CollapsiblePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_COLLAPSIBLE_COMMAND,
      (payload) => {
        const { title = "Collapsible Title", isOpen = false } = payload || {}
        
        const containerNode = $createCollapsibleContainerNode(isOpen)
        const titleNode = $createCollapsibleTitleNode()
        const contentNode = $createCollapsibleContentNode()
        
        titleNode.append($createParagraphNode().append($createTextNode(title)))
        contentNode.append($createParagraphNode())
        
        containerNode.append(titleNode, contentNode)
        
        $insertNodes([containerNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

import { $createTextNode } from "lexical"