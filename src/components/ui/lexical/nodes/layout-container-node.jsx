/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, ElementNode } from "lexical"

export class LayoutContainerNode extends ElementNode {
  __templateColumns

  constructor(templateColumns, key) {
    super(key)
    this.__templateColumns = templateColumns
  }

  static getType() {
    return "layout-container"
  }

  static clone(node) {
    return new LayoutContainerNode(node.__templateColumns, node.__key)
  }

  createDOM() {
    const dom = document.createElement("div")
    dom.style.display = "grid"
    dom.style.gridTemplateColumns = this.__templateColumns
    dom.style.gap = "10px"
    return dom
  }

  updateDOM(prevNode) {
    return prevNode.__templateColumns !== this.__templateColumns
  }

  static importJSON(serializedNode) {
    const node = $createLayoutContainerNode(serializedNode.templateColumns)
    return node
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      templateColumns: this.__templateColumns,
      type: "layout-container",
      version: 1,
    }
  }

  getTemplateColumns() {
    return this.__templateColumns
  }

  setTemplateColumns(templateColumns) {
    const writable = this.getWritable()
    writable.__templateColumns = templateColumns
  }
}

export function $createLayoutContainerNode(templateColumns) {
  return $applyNodeReplacement(new LayoutContainerNode(templateColumns))
}

export function $isLayoutContainerNode(node) {
  return node instanceof LayoutContainerNode
}