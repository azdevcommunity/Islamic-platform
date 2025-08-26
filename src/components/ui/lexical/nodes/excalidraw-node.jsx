/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Suspense } from "react"
import { $applyNodeReplacement, DecoratorNode } from "lexical"

const ExcalidrawComponent = React.lazy(() => import("../editor-ui/excalidraw-component"))

export class ExcalidrawNode extends DecoratorNode {
  __data

  static getType() {
    return "excalidraw"
  }

  static clone(node) {
    return new ExcalidrawNode(node.__data, node.__key)
  }

  constructor(data = "{}", key) {
    super(key)
    this.__data = data
  }

  static importJSON(serializedNode) {
    const node = $createExcalidrawNode()
    const { data } = serializedNode
    node.setData(data)
    return node
  }

  exportJSON() {
    return {
      data: this.getData(),
      type: "excalidraw",
      version: 1,
    }
  }

  createDOM(config) {
    const div = document.createElement("div")
    const theme = config.theme
    const className = theme.excalidraw
    if (className !== undefined) {
      div.className = className
    }
    return div
  }

  updateDOM() {
    return false
  }

  getData() {
    return this.__data
  }

  setData(data) {
    const writable = this.getWritable()
    writable.__data = data
  }

  decorate() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ExcalidrawComponent
          data={this.__data}
          nodeKey={this.getKey()}
        />
      </Suspense>
    )
  }
}

export function $createExcalidrawNode() {
  return $applyNodeReplacement(new ExcalidrawNode())
}

export function $isExcalidrawNode(node) {
  return node instanceof ExcalidrawNode
}