/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Suspense } from "react"
import { $applyNodeReplacement, DecoratorNode } from "lexical"

const ImageComponent = React.lazy(() => import("../editor-ui/image-component"))

export class ImageNode extends DecoratorNode {
  __src
  __altText
  __width
  __height
  __maxWidth
  __showCaption
  __caption

  static getType() {
    return "image"
  }

  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__key
    )
  }

  constructor(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    key
  ) {
    super(key)
    this.__src = src
    this.__altText = altText
    this.__maxWidth = maxWidth
    this.__width = width || "inherit"
    this.__height = height || "inherit"
    this.__showCaption = showCaption || false
    this.__caption = caption
  }

  exportDOM() {
    const element = document.createElement("img")
    element.setAttribute("src", this.__src)
    element.setAttribute("alt", this.__altText)
    element.setAttribute("width", this.__width.toString())
    element.setAttribute("height", this.__height.toString())
    return { element }
  }

  static importDOM() {
    return {
      img: (node) => ({
        conversion: $convertImageElement,
        priority: 0,
      }),
    }
  }

  static importJSON(serializedNode) {
    const { altText, height, width, maxWidth, caption, src, showCaption } =
      serializedNode
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
    })
    return node
  }

  exportJSON() {
    return {
      altText: this.getAltText(),
      caption: this.getCaption(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: "image",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width,
    }
  }

  setWidthAndHeight(width, height) {
    const writable = this.getWritable()
    writable.__width = width
    writable.__height = height
  }

  setShowCaption(showCaption) {
    const writable = this.getWritable()
    writable.__showCaption = showCaption
  }

  createDOM(config) {
    const span = document.createElement("span")
    const theme = config.theme
    const className = theme.image
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

  getCaption() {
    return this.__caption
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
          caption={this.__caption}
          captionsEnabled={true}
        />
      </Suspense>
    )
  }
}

function $convertImageElement(domNode) {
  const img = domNode
  if (img.src.startsWith("file:///")) {
    return null
  }
  const { alt: altText, src, width, height } = img
  const node = $createImageNode({ altText, height, src, width })
  return { node }
}

export function $createImageNode({
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key,
}) {
  return $applyNodeReplacement(
    new ImageNode(
      src,
      altText,
      maxWidth,
      width,
      height,
      showCaption,
      caption,
      key
    )
  )
}

export function $isImageNode(node) {
  return node instanceof ImageNode
}