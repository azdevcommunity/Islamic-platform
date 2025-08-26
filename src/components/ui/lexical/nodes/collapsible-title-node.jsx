/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, ElementNode } from "lexical"

export class CollapsibleTitleNode extends ElementNode {
  static getType() {
    return "collapsible-title"
  }

  static clone(node) {
    return new CollapsibleTitleNode(node.__key)
  }

  createDOM() {
    const dom = document.createElement("summary")
    dom.classList.add("Collapsible__title")
    return dom
  }

  updateDOM() {
    return false
  }

  static importDOM() {
    return {
      summary: (domNode) => {
        return {
          conversion: () => ({
            node: $createCollapsibleTitleNode(),
          }),
          priority: 1,
        }
      },
    }
  }

  static importJSON() {
    return $createCollapsibleTitleNode()
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "collapsible-title",
      version: 1,
    }
  }
}

export function $createCollapsibleTitleNode() {
  return $applyNodeReplacement(new CollapsibleTitleNode())
}

export function $isCollapsibleTitleNode(node) {
  return node instanceof CollapsibleTitleNode
}