/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createAutoLinkNode, $isAutoLinkNode, AutoLinkNode } from "@lexical/link"
import { $createTextNode, $isElementNode, $isTextNode, TextNode } from "lexical"

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

const MATCHERS = [
  (text) => {
    const match = URL_REGEX.exec(text)
    if (match === null) {
      return null
    }
    const fullMatch = match[0]
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
    }
  },
  (text) => {
    const match = EMAIL_REGEX.exec(text)
    if (match === null) {
      return null
    }
    const fullMatch = match[0]
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: `mailto:${fullMatch}`,
    }
  },
]

function findFirstMatch(text, matchers) {
  for (let i = 0; i < matchers.length; i++) {
    const match = matchers[i](text)

    if (match) {
      return match
    }
  }

  return null
}

function $createAutoLinkPlugin(
  node,
  matchers
) {
  const nodeText = node.getTextContent()
  let text = nodeText
  let invalidMatchEnd = 0

  while (text.length > 0) {
    const match = findFirstMatch(text, matchers)

    if (match === null) {
      break
    }

    const matchStart = invalidMatchEnd + match.index
    const matchEnd = matchStart + match.length

    if (matchStart === 0 && matchEnd === nodeText.length) {
      // Perfect match, replace entire node
      const linkNode = $createAutoLinkNode(match.url)
      linkNode.append($createTextNode(match.text))
      node.replace(linkNode)
      return
    }

    let beforeText = nodeText.slice(0, matchStart)
    let afterText = nodeText.slice(matchEnd)

    const beforeTextNode = beforeText ? $createTextNode(beforeText) : null
    const linkNode = $createAutoLinkNode(match.url)
    linkNode.append($createTextNode(match.text))
    const afterTextNode = afterText ? $createTextNode(afterText) : null

    const nodes = []
    if (beforeTextNode) nodes.push(beforeTextNode)
    nodes.push(linkNode)
    if (afterTextNode) nodes.push(afterTextNode)

    node.replace(...nodes)
    return
  }
}

export function AutoLinkPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      (textNode) => {
        const parent = textNode.getParent()
        if ($isAutoLinkNode(parent)) {
          return
        }
        // Check if parent is an element node and has complex content
        if ($isElementNode(parent)) {
          // Skip if parent has multiple children or non-text children
          const children = parent.getChildren()
          if (children.length > 1 || children.some(child => !$isTextNode(child))) {
            return
          }
        }
        $createAutoLinkPlugin(textNode, MATCHERS)
      }
    )

    return removeTransform
  }, [editor])

  return null
}