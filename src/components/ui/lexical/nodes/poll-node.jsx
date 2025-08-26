/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Suspense } from "react"
import { $applyNodeReplacement, DecoratorNode } from "lexical"

const PollComponent = React.lazy(() => import("../editor-ui/poll-component"))

export class PollNode extends DecoratorNode {
  __question
  __options

  static getType() {
    return "poll"
  }

  static clone(node) {
    return new PollNode(node.__question, node.__options, node.__key)
  }

  constructor(question, options, key) {
    super(key)
    this.__question = question
    this.__options = options
  }

  static importJSON(serializedNode) {
    const { question, options } = serializedNode
    const node = $createPollNode(question, options)
    return node
  }

  exportJSON() {
    return {
      question: this.getQuestion(),
      options: this.getOptions(),
      type: "poll",
      version: 1,
    }
  }

  createDOM(config) {
    const div = document.createElement("div")
    const theme = config.theme
    const className = theme.poll
    if (className !== undefined) {
      div.className = className
    }
    return div
  }

  updateDOM() {
    return false
  }

  getQuestion() {
    return this.__question
  }

  getOptions() {
    return this.__options
  }

  setQuestion(question) {
    const writable = this.getWritable()
    writable.__question = question
  }

  setOptions(options) {
    const writable = this.getWritable()
    writable.__options = options
  }

  decorate() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PollComponent
          question={this.__question}
          options={this.__options}
          nodeKey={this.getKey()}
        />
      </Suspense>
    )
  }
}

export function $createPollNode(question = "", options = []) {
  return $applyNodeReplacement(new PollNode(question, options))
}

export function $isPollNode(node) {
  return node instanceof PollNode
}