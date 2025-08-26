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
import { $createKeywordNode } from "../nodes/keyword-node"

export function KeywordPlugin({ keywords = [] }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (keywords.length === 0) return

    const removeTransform = editor.registerNodeTransform(
      TextNode,
      (textNode) => {
        const textContent = textNode.getTextContent()
        
        // Create regex for keywords
        const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi')
        
        if (keywordRegex.test(textContent)) {
          const parts = textContent.split(keywordRegex)
          const matches = textContent.match(keywordRegex) || []
          
          if (matches.length > 0) {
            const nodes = []
            let partIndex = 0
            
            for (let i = 0; i < matches.length; i++) {
              // Add text before keyword
              if (parts[partIndex]) {
                nodes.push($createTextNode(parts[partIndex]))
              }
              partIndex++
              
              // Add keyword node
              nodes.push($createKeywordNode(matches[i]))
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
  }, [editor, keywords])

  return null
}