/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, TextNode } from "lexical"

const mentionStyle = "background-color: rgba(24, 119, 232, 0.2)"

export class MentionNode extends TextNode {
  __mention

  static getType() {
    return "mention"
  }

  static clone(node) {
    return new MentionNode(node.__mention, node.__text, node.__key)
  }

  constructor(mentionName, text, key) {
    super(text, key)
    this.__mention = mentionName
  }

  createDOM(config) {
    const dom = super.createDOM(config)
    dom.style.cssText = mentionStyle
    dom.className = "mention"
    return dom
  }

  static importDOM() {
    return {
      span: (domNode) => {
        if (!domNode.hasAttribute("data-lexical-mention")) {
          return null
        }
        return {
          conversion: $convertMentionElement,
          priority: 1,
        }
      },
    }
  }

  static importJSON(serializedNode) {
    const { mentionName, text } = serializedNode
    const node = $createMentionNode(mentionName, text)
    return node
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      mentionName: this.__mention,
    }
  }

  getMention() {
    return this.__mention
  }
}

function $convertMentionElement(domNode) {
  const textContent = domNode.textContent

  if (textContent !== null) {
    const node = $createMentionNode(textContent)
    return {
      node,
    }
  }

  return null
}

export function $createMentionNode(mentionName, text) {
  const mentionText = text || mentionName
  const node = new MentionNode(mentionName, mentionText).setMode("segmented")
  return $applyNodeReplacement(node)
}

export function $isMentionNode(node) {
  return node instanceof MentionNode
}