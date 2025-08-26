/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $applyNodeReplacement, DecoratorNode } from "lexical"

export class PageBreakNode extends DecoratorNode {
  static getType() {
    return "page-break"
  }

  static clone(node) {
    return new PageBreakNode(node.__key)
  }

  constructor(key) {
    super(key)
  }

  static importJSON() {
    return $createPageBreakNode()
  }

  static importDOM() {
    return {
      figure: (domNode) => {
        const tp = domNode.getAttribute("type")
        if (tp !== this.getType()) {
          return null
        }

        return {
          conversion: () => ({
            node: $createPageBreakNode(),
          }),
          priority: 3,
        }
      },
    }
  }

  exportJSON() {
    return {
      type: this.getType(),
      version: 1,
    }
  }

  createDOM(config) {
    const div = document.createElement("div")
    div.style.pageBreakAfter = "always"
    div.style.opacity = "0.2"
    div.style.borderTop = "1px dashed #ccc"
    div.style.margin = "20px 0"
    div.style.padding = "10px 0"
    div.style.textAlign = "center"
    div.style.fontSize = "12px"
    div.style.color = "#666"
    div.textContent = "--- Sayfa Sonu ---"
    
    const theme = config.theme
    const className = theme.pageBreak
    if (className !== undefined) {
      div.className = className
    }
    return div
  }

  updateDOM() {
    return false
  }

  decorate() {
    return (
      <div
        style={{
          pageBreakAfter: "always",
          opacity: 0.2,
          borderTop: "1px dashed #ccc",
          margin: "20px 0",
          padding: "10px 0",
          textAlign: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        --- Sayfa Sonu ---
      </div>
    )
  }
}

export function $createPageBreakNode() {
  return $applyNodeReplacement(new PageBreakNode())
}

export function $isPageBreakNode(node) {
  return node instanceof PageBreakNode
}