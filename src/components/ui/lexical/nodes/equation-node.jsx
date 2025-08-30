/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Suspense } from "react"
import { $applyNodeReplacement, DecoratorNode } from "lexical"

const EquationComponent = React.lazy(() => import("../editor-ui/equation-component"))

export class EquationNode extends DecoratorNode {
  __equation
  __inline

  static getType() {
    return "equation"
  }

  static clone(node) {
    return new EquationNode(node.__equation, node.__inline, node.__key)
  }

  constructor(equation, inline, key) {
    super(key)
    this.__equation = equation
    this.__inline = inline ?? false
  }

  static importDOM() {
    return {
      span: (domNode) => {
        if (!domNode.hasAttribute("data-lexical-equation")) {
          return null
        }
        return {
          conversion: $convertEquationElement,
          priority: 2,
        }
      },
    }
  }

  static importJSON(serializedNode) {
    const { equation, inline } = serializedNode
    const node = $createEquationNode(equation, inline)
    return node
  }

  exportJSON() {
    return {
      equation: this.getEquation(),
      inline: this.__inline,
      type: "equation",
      version: 1,
    }
  }

  createDOM(config) {
    const element = document.createElement(this.__inline ? "span" : "div")
    element.setAttribute("data-lexical-equation", btoa(this.__equation))
    element.setAttribute("data-lexical-inline", this.__inline.toString())
    const theme = config.theme
    const className = theme.equation
    if (className !== undefined) {
      element.className = className
    }
    return element
  }

  updateDOM(prevNode) {
    return (
      this.__equation !== prevNode.__equation ||
      this.__inline !== prevNode.__inline
    )
  }

  getEquation() {
    return this.__equation
  }

  setEquation(equation) {
    const writable = this.getWritable()
    writable.__equation = equation
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <EquationComponent
          equation={this.__equation}
          inline={this.__inline}
          nodeKey={this.getKey()}
        />
      </Suspense>
    )
  }
}

function $convertEquationElement(domNode) {
  let equation = domNode.getAttribute("data-lexical-equation")
  const inline = domNode.getAttribute("data-lexical-inline") === "true"
  equation = atob(equation || "")
  if (equation) {
    const node = $createEquationNode(equation, inline)
    return { node }
  }

  return null
}

export function $createEquationNode(equation = "", inline = false) {
  const equationNode = new EquationNode(equation, inline)
  return $applyNodeReplacement(equationNode)
}

export function $isEquationNode(node) {
  return node instanceof EquationNode
}