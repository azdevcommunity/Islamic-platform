/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $createEmojiNode } from "../nodes/emoji-node"

export const EMOJI = {
  dependencies: [],
  export: (node) => {
    if (node.__type === "emoji") {
      return node.getTextContent()
    }
    return null
  },
  importRegExp: /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
  regExp: /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
  replace: (textNode, match) => {
    const emojiNode = $createEmojiNode("emoji", match[0])
    textNode.replace(emojiNode)
  },
  trigger: ":",
  type: "text-match",
}