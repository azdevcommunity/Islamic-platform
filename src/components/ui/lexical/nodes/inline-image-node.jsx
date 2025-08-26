/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Suspense } from "react"
import { $applyNodeReplacement, DecoratorNode } from "lexical"

const InlineImageComponent = React.lazy(() => import("../editor-ui/inline-image-component"))

export class InlineImageNode extends DecoratorNode {
  __src
  __altText
  __width
  __height

  static getType() {
    return "inline-image"
  }

  static clone(node) {
    return new InlineImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__key
    )
  }

  constructor(src, altText, width, height, key) {
    super(key)
    this.__src = src
    this.__altText = altText
    this.__width = width || 200
    this.__height = height || 200
  }

  static importJSON(serializedNode) {
    const { altText, height, width, src } = serializedNode
    const node = $createInlineImageNode({
      altText,
      height,
      src,
      width,
    })
    return node
  }

  exportJSON() {
    return {
      altText: this.getAltText(),
      height: this.__height,
      src: this.getSrc(),
      type: "inline-image",
      version: 1,
      width: this.__width,
    }
  }

  createDOM(config) {
    const span = document.createElement("span")
    const theme = config.theme
    const className = theme.inlineImage
    if (className !== undefined) {
      span.className = className
    }
    return span
  }

  updateDOM() {
    return false
  }

  getSrc() {
    return this.__src
  }

  getAltText() {
    return this.__altText
  }

  setWidthAndHeight(width, height) {
    const writable = this.getWritable()
    writable.__width = width
    writable.__height = height
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <InlineImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          nodeKey={this.getKey()}
        />
      </Suspense>
    )
  }
}

export function $createInlineImageNode({
  altText,
  height,
  src,
  width,
  key,
}) {
  return $applyNodeReplacement(
    new InlineImageNode(src, altText, width, height, key)
  )
}

export function $isInlineImageNode(node) {
  return node instanceof InlineImageNode
}