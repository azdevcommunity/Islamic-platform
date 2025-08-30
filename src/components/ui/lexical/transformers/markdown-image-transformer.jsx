/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $createImageNode } from "../nodes/image-node"

export const IMAGE = {
  dependencies: [],
  export: (node) => {
    if (node.__type === "image") {
      return `![${node.getAltText()}](${node.getSrc()})`
    }
    return null
  },
  importRegExp: /!\[([^[]*)\]\(([^()\s]+)\)/,
  regExp: /!\[([^[]*)\]\(([^()\s]+)\)/,
  replace: (textNode, match) => {
    const [, altText, src] = match
    const imageNode = $createImageNode({
      altText,
      maxWidth: 800,
      src,
    })
    textNode.replace(imageNode)
  },
  trigger: "!",
  type: "text-match",
}