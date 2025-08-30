/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, ElementNode } from "lexical"

export class CollapsibleContentNode extends ElementNode {
  static getType() {
    return "collapsible-content"
  }

  static clone(node) {
    return new CollapsibleContentNode(node.__key)
  }

  createDOM() {
    const dom = document.createElement("div")
    dom.classList.add("Collapsible__content")
    return dom
  }

  updateDOM() {
    return false
  }

  static importDOM() {
    return {}
  }

  static importJSON() {
    return $createCollapsibleContentNode()
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "collapsible-content",
      version: 1,
    }
  }

  isShadowRoot() {
    return true
  }
}

export function $createCollapsibleContentNode() {
  return $applyNodeReplacement(new CollapsibleContentNode())
}

export function $isCollapsibleContentNode(node) {
  return node instanceof CollapsibleContentNode
}