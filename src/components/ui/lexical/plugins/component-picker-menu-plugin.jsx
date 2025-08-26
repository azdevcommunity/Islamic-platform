/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
} from "lexical"
import { $createHeadingNode } from "@lexical/rich-text"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import { INSERT_EQUATION_COMMAND } from "./equation-plugin"
import { INSERT_EXCALIDRAW_COMMAND } from "./excalidraw-plugin"
import { INSERT_POLL_COMMAND } from "./poll-plugin"
import { INSERT_PAGE_BREAK_COMMAND } from "./page-break-plugin"
import { INSERT_COLLAPSIBLE_COMMAND } from "./collapsible-plugin"
import { INSERT_LAYOUT_COMMAND } from "./layout-plugin"

const COMPONENT_PICKER_MENU_ITEMS = [
  {
    title: "Paragraph",
    description: "Normal text",
    keywords: ["normal", "paragraph", "p", "text"],
    onSelect: (editor) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.insertNodes([$createParagraphNode()])
        }
      })
    },
  },
  {
    title: "Heading 1",
    description: "Large section heading",
    keywords: ["heading", "header", "h1"],
    onSelect: (editor) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.insertNodes([$createHeadingNode("h1")])
        }
      })
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    keywords: ["heading", "header", "h2"],
    onSelect: (editor) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.insertNodes([$createHeadingNode("h2")])
        }
      })
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    keywords: ["heading", "header", "h3"],
    onSelect: (editor) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.insertNodes([$createHeadingNode("h3")])
        }
      })
    },
  },
  {
    title: "Horizontal Rule",
    description: "Divider line",
    keywords: ["horizontal rule", "divider", "hr"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
    },
  },
  {
    title: "Equation",
    description: "Mathematical equation",
    keywords: ["equation", "math", "formula"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_EQUATION_COMMAND, { equation: "", inline: false })
    },
  },
  {
    title: "Drawing",
    description: "Excalidraw drawing",
    keywords: ["drawing", "excalidraw", "sketch"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, {})
    },
  },
  {
    title: "Poll",
    description: "Interactive poll",
    keywords: ["poll", "survey", "vote"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_POLL_COMMAND, {})
    },
  },
  {
    title: "Page Break",
    description: "Page break for printing",
    keywords: ["page break", "break", "print"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_PAGE_BREAK_COMMAND, {})
    },
  },
  {
    title: "Collapsible",
    description: "Collapsible content section",
    keywords: ["collapsible", "accordion", "toggle"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, {})
    },
  },
  {
    title: "2 Columns",
    description: "Two column layout",
    keywords: ["columns", "layout", "grid"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_LAYOUT_COMMAND, { columns: 2 })
    },
  },
  {
    title: "3 Columns",
    description: "Three column layout",
    keywords: ["columns", "layout", "grid"],
    onSelect: (editor) => {
      editor.dispatchCommand(INSERT_LAYOUT_COMMAND, { columns: 3 })
    },
  },
]

export function ComponentPickerMenuPlugin() {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredItems = useMemo(() => {
    if (!queryString) return COMPONENT_PICKER_MENU_ITEMS

    return COMPONENT_PICKER_MENU_ITEMS.filter((item) => {
      const searchString = queryString.toLowerCase()
      return (
        item.title.toLowerCase().includes(searchString) ||
        item.description.toLowerCase().includes(searchString) ||
        item.keywords.some((keyword) => keyword.includes(searchString))
      )
    })
  }, [queryString])

  const selectItem = useCallback(
    (item) => {
      item.onSelect(editor)
      setQueryString("")
      setSelectedIndex(0)
    },
    [editor]
  )

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (queryString === "") return false

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
          return true
        case "ArrowUp":
          event.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
          return true
        case "Enter":
        case "Tab":
          event.preventDefault()
          if (filteredItems[selectedIndex]) {
            selectItem(filteredItems[selectedIndex])
          }
          return true
        case "Escape":
          event.preventDefault()
          setQueryString("")
          setSelectedIndex(0)
          return true
        default:
          return false
      }
    }

    return editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      handleKeyDown,
      COMMAND_PRIORITY_LOW
    )
  }, [editor, filteredItems, queryString, selectedIndex, selectItem])

  if (!queryString) {
    return null
  }

  return (
    <div className="component-picker-menu">
      {filteredItems.map((item, index) => (
        <div
          key={item.title}
          className={`component-picker-item ${index === selectedIndex ? "selected" : ""}`}
          onClick={() => selectItem(item)}
        >
          <div className="component-picker-item-title">{item.title}</div>
          <div className="component-picker-item-description">{item.description}</div>
        </div>
      ))}
    </div>
  )
}