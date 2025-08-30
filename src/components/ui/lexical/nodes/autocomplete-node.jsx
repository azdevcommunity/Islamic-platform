/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Suspense } from "react"
import { $applyNodeReplacement, DecoratorNode } from "lexical"

const AutocompleteComponent = React.lazy(() => import("../editor-ui/autocomplete-component"))

export class AutocompleteNode extends DecoratorNode {
  __uuid

  constructor(uuid, key) {
    super(key)
    this.__uuid = uuid
  }

  static getType() {
    return "autocomplete"
  }

  static clone(node) {
    return new AutocompleteNode(node.__uuid, node.__key)
  }

  static importJSON(serializedNode) {
    const { uuid } = serializedNode
    const node = $createAutocompleteNode(uuid)
    return node
  }

  exportJSON() {
    return {
      type: "autocomplete",
      uuid: this.__uuid,
      version: 1,
    }
  }

  createDOM() {
    return document.createElement("span")
  }

  updateDOM() {
    return false
  }

  getUUID() {
    return this.__uuid
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <AutocompleteComponent
          uuid={this.__uuid}
          nodeKey={this.getKey()}
        />
      </Suspense>
    )
  }
}

export function $createAutocompleteNode(uuid) {
  return $applyNodeReplacement(new AutocompleteNode(uuid))
}

export function $isAutocompleteNode(node) {
  return node instanceof AutocompleteNode
}