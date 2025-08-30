/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, ElementNode } from "lexical"

export class CollapsibleContainerNode extends ElementNode {
  __open

  constructor(open, key) {
    super(key)
    this.__open = open
  }

  static getType() {
    return "collapsible-container"
  }

  static clone(node) {
    return new CollapsibleContainerNode(node.__open, node.__key)
  }

  createDOM(config) {
    const dom = document.createElement("details")
    dom.classList.add("Collapsible__container")
    dom.setAttribute("open", this.__open)
    return dom
  }

  updateDOM(prevNode, dom) {
    if (prevNode.__open !== this.__open) {
      if (this.__open) {
        dom.setAttribute("open", "")
      } else {
        dom.removeAttribute("open")
      }
    }
    return false
  }

  static importDOM() {
    return {
      details: (domNode) => {
        return {
          conversion: $convertDetailsElement,
          priority: 1,
        }
      },
    }
  }

  static importJSON(serializedNode) {
    const node = $createCollapsibleContainerNode(serializedNode.open)
    return node
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      open: this.__open,
      type: "collapsible-container",
      version: 1,
    }
  }

  setOpen(open) {
    const writable = this.getWritable()
    writable.__open = open
  }

  getOpen() {
    return this.__open
  }

  toggleOpen() {
    this.setOpen(!this.getOpen())
  }
}

function $convertDetailsElement(domNode) {
  const isOpen = domNode.hasAttribute("open")
  const node = $createCollapsibleContainerNode(isOpen)
  return {
    node,
  }
}

export function $createCollapsibleContainerNode(isOpen = false) {
  return $applyNodeReplacement(new CollapsibleContainerNode(isOpen))
}

export function $isCollapsibleContainerNode(node) {
  return node instanceof CollapsibleContainerNode
}