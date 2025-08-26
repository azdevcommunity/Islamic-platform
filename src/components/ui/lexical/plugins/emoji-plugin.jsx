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
import { $createEmojiNode } from "../nodes/emoji-node"

export function EmojiPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      (textNode) => {
        const textContent = textNode.getTextContent()
        
        // Simple emoji detection - you can expand this
        const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu
        
        if (emojiRegex.test(textContent)) {
          const parts = textContent.split(emojiRegex)
          const matches = textContent.match(emojiRegex) || []
          
          if (matches.length > 0) {
            const nodes = []
            
            for (let i = 0; i < parts.length; i++) {
              if (parts[i]) {
                nodes.push($createTextNode(parts[i]))
              }
              if (matches[i]) {
                nodes.push($createEmojiNode("emoji", matches[i]))
              }
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