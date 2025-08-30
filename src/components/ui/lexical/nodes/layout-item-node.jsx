/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, ElementNode } from "lexical"

export class LayoutItemNode extends ElementNode {
  static getType() {
    return "layout-item"
  }

  static clone(node) {
    return new LayoutItemNode(node.__key)
  }

  createDOM() {
    const dom = document.createElement("div")
    return dom
  }

  updateDOM() {
    return false
  }

  static importJSON() {
    return $createLayoutItemNode()
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "layout-item",
      version: 1,
    }
  }

  isShadowRoot() {
    return true
  }
}

export function $createLayoutItemNode() {
  return $applyNodeReplacement(new LayoutItemNode())
}

export function $isLayoutItemNode(node) {
  return node instanceof LayoutItemNode
}