/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, TextNode } from "lexical"
import { $createMentionNode } from "../nodes/mention-node"

export function MentionPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      (textNode) => {
        const textContent = textNode.getTextContent()
        
        // Simple mention detection (@username)
        const mentionRegex = /@(\w+)/g
        
        if (mentionRegex.test(textContent)) {
          const parts = textContent.split(mentionRegex)
          const matches = textContent.match(mentionRegex) || []
          
          if (matches.length > 0) {
            const nodes = []
            let partIndex = 0
            
            for (let i = 0; i < matches.length; i++) {
              // Add text before mention
              if (parts[partIndex]) {
                nodes.push($createTextNode(parts[partIndex]))
              }
              partIndex++
              
              // Skip the captured group (username without @)
              partIndex++
              
              // Add mention node
              const mentionText = matches[i]
              const username = mentionText.substring(1) // Remove @
              nodes.push($createMentionNode(username, mentionText))
            }
            
            // Add remaining text
            if (parts[partIndex]) {
              nodes.push($createTextNode(parts[partIndex]))
            }
            
            if (nodes.length > 1) {
              textNode.replace(...nodes)
            }
          }
        }
      }
    )

    return removeTransform
  }, [editor])

  return null
}