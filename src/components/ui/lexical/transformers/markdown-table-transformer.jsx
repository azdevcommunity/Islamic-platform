/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  $createTableCellNode,
  $createTableNode,
  $createTableRowNode,
  $isTableNode,
  TableCellHeaderStates,
} from "@lexical/table"
import { $createParagraphNode, $createTextNode } from "lexical"

export const TABLE = {
  dependencies: [],
  export: (node) => {
    if (!$isTableNode(node)) {
      return null
    }

    const output = []

    for (const row of node.getChildren()) {
      const rowOutput = []
      if (row.getChildrenSize() === 0) {
        continue
      }

      for (const cell of row.getChildren()) {
        // It's TableCellNode so it's just to make flow happy
        const textContent = cell.getTextContent()
        rowOutput.push(
          textContent.replace(/\n/g, "\\n").replace(/\|/g, "\\|") || " "
        )
      }
      output.push(`| ${rowOutput.join(" | ")} |`)
    }

    if (output.length) {
      const firstRow = output[0]
      const separatorRow = firstRow.replace(/[^|]/g, "-")
      output.splice(1, 0, separatorRow)
    }

    return output.join("\n")
  },
  regExp: /^(\|.+)\|[ \t]*$/,
  replace: (parentNode, _1, match) => {
    // Header row
    const matchCells = match.split("|")
    const headerCells = matchCells
      .slice(1, -1)
      .map((cell) => cell.replace(/\\n/g, "\n").replace(/\\\|/g, "|").trim())

    const table = $createTableNode()
    const headerRow = $createTableRowNode()
    table.append(headerRow)

    for (const cellContent of headerCells) {
      const cell = $createTableCellNode(TableCellHeaderStates.ROW)
      const paragraph = $createParagraphNode()
      paragraph.append($createTextNode(cellContent))
      cell.append(paragraph)
      headerRow.append(cell)
    }

    const siblings = parentNode.getNextSiblings()
    let separatorFound = false

    for (const sibling of siblings) {
      const siblingText = sibling.getTextContent()

      if (siblingText.match(/^\|[ \t]*:?-+:?[ \t]*(\|[ \t]*:?-+:?[ \t]*)*\|[ \t]*$/)) {
        separatorFound = true
        sibling.remove()
        break
      }
    }

    if (!separatorFound) {
      return
    }

    // Data rows
    for (const sibling of siblings) {
      const siblingText = sibling.getTextContent()
      const tableMatch = siblingText.match(/^(\|.+)\|[ \t]*$/)

      if (!tableMatch) {
        break
      }

      const matchCells = tableMatch[1].split("|")
      const cells = matchCells
        .slice(1, -1)
        .map((cell) => cell.replace(/\\n/g, "\n").replace(/\\\|/g, "|").trim())

      const row = $createTableRowNode()
      table.append(row)

      for (const cellContent of cells) {
        const cell = $createTableCellNode(TableCellHeaderStates.NO_STATUS)
        const paragraph = $createParagraphNode()
        paragraph.append($createTextNode(cellContent))
        cell.append(paragraph)
        row.append(cell)
      }

      sibling.remove()
    }

    parentNode.replace(table)
    table.selectEnd()
  },
  type: "element",
}