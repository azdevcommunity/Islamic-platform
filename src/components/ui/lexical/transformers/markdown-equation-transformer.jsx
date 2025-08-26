/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $createEquationNode } from "../nodes/equation-node"

export const EQUATION = {
  dependencies: [],
  export: (node) => {
    if (node.__type === "equation") {
      const equation = node.getEquation()
      const inline = node.__inline
      return inline ? `$${equation}$` : `$$${equation}$$`
    }
    return null
  },
  importRegExp: /\$\$(.+?)\$\$|\$(.+?)\$/,
  regExp: /\$\$(.+?)\$\$|\$(.+?)\$/,
  replace: (textNode, match) => {
    const equation = match[1] || match[2]
    const inline = match[0].startsWith("$$") ? false : true
    const equationNode = $createEquationNode(equation, inline)
    textNode.replace(equationNode)
  },
  trigger: "$",
  type: "text-match",
}