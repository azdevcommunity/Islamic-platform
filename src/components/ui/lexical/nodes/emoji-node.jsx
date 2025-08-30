/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $applyNodeReplacement, TextNode } from "lexical"

export class EmojiNode extends TextNode {
  __className

  static getType() {
    return "emoji"
  }

  static clone(node) {
    return new EmojiNode(node.__className, node.__text, node.__key)
  }

  constructor(className, text, key) {
    super(text, key)
    this.__className = className
  }

  createDOM(config) {
    const dom = document.createElement("span")
    const inner = super.createDOM(config)
    dom.className = this.__className
    inner.className = "emoji-inner"
    dom.appendChild(inner)
    return dom
  }

  updateDOM(prevNode, dom, config) {
    const inner = dom.firstChild
    if (inner === null) {
      return true
    }
    super.updateDOM(prevNode, inner, config)
    return false
  }

  static importDOM() {
    return {
      span: (domNode) => {
        if (!domNode.hasAttribute("data-lexical-emoji")) {
          return null
        }
        return {
          conversion: $convertEmojiElement,
          priority: 1,
        }
      },
    }
  }

  static importJSON(serializedNode) {
    const { className, text } = serializedNode
    const node = $createEmojiNode(className, text)
    return node
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      className: this.getClassName(),
    }
  }

  getClassName() {
    const self = this.getLatest()
    return self.__className
  }
}

function $convertEmojiElement(domNode) {
  const textContent = domNode.textContent

  if (textContent !== null) {
    const node = $createEmojiNode("emoji", textContent)
    return {
      node,
    }
  }

  return null
}

export function $createEmojiNode(className, emojiText) {
  const node = new EmojiNode(className, emojiText).setMode("token")
  return $applyNodeReplacement(node)
}

export function $isEmojiNode(node) {
  return node instanceof EmojiNode
}