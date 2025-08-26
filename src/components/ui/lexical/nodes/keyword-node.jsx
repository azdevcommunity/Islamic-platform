/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, TextNode } from "lexical"

export class KeywordNode extends TextNode {
  static getType() {
    return "keyword"
  }

  static clone(node) {
    return new KeywordNode(node.__text, node.__key)
  }

  constructor(text, key) {
    super(text, key)
  }

  createDOM(config) {
    const dom = super.createDOM(config)
    dom.style.backgroundColor = "yellow"
    dom.style.padding = "1px 0.25rem"
    dom.style.fontWeight = "bold"
    dom.className = "keyword"
    return dom
  }

  static importDOM() {
    return {
      span: (domNode) => {
        if (!domNode.hasAttribute("data-lexical-keyword")) {
          return null
        }
        return {
          conversion: $convertKeywordElement,
          priority: 1,
        }
      },
    }
  }

  static importJSON(serializedNode) {
    const { text } = serializedNode
    const node = $createKeywordNode(text)
    return node
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "keyword",
      version: 1,
    }
  }
}

function $convertKeywordElement(domNode) {
  const textContent = domNode.textContent

  if (textContent !== null) {
    const node = $createKeywordNode(textContent)
    return {
      node,
    }
  }

  return null
}

export function $createKeywordNode(keyword) {
  const node = new KeywordNode(keyword).setMode("segmented")
  return $applyNodeReplacement(node)
}

export function $isKeywordNode(node) {
  return node instanceof KeywordNode
}