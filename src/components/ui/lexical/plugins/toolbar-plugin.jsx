"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolbarContext } from "../context/toolbar-context"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
} from "lexical"
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text"
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from "@lexical/list"
import { $setBlocksType } from "@lexical/selection"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import { INSERT_TABLE_COMMAND } from "@lexical/table"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Link,
  Image,
  Table,
  Palette,
  Type,
  Plus,
  Heading1,
  Heading2,
  Heading3,
  Text,
  ListTodo,
} from "lucide-react"

function Divider() {
  return <Separator orientation="vertical" className="mx-1 h-6" />
}

export function ToolbarPlugin({ children }) {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState("paragraph")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $getNearestNodeOfType(anchorNode, $createParagraphNode)

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      // Update text format
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsCode(selection.hasFormat("code"))

      // Update block type
      if ($isHeadingNode(element)) {
        const tag = element.getTag()
        setBlockType(tag)
      } else {
        const type = element.getType()
        if (type in blockTypeToBlockName) {
          setBlockType(type)
        } else {
          setBlockType("paragraph")
        }
      }
    }
  }, [activeEditor])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, $updateToolbar])

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      activeEditor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          $updateToolbar()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [activeEditor, $updateToolbar])

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = (headingSize) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize))
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const insertHorizontalRule = () => {
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
  }

  const blockTypeToBlockName = {
    bullet: { label: "Madde İşaretli", icon: <List className="h-4 w-4" /> },
    check: { label: "Kontrol Listesi", icon: <ListTodo className="h-4 w-4" /> },
    code: { label: "Kod Bloğu", icon: <Code className="h-4 w-4" /> },
    h1: { label: "Başlık 1", icon: <Heading1 className="h-4 w-4" /> },
    h2: { label: "Başlık 2", icon: <Heading2 className="h-4 w-4" /> },
    h3: { label: "Başlık 3", icon: <Heading3 className="h-4 w-4" /> },
    number: { label: "Numaralı Liste", icon: <ListOrdered className="h-4 w-4" /> },
    paragraph: { label: "Normal", icon: <Text className="h-4 w-4" /> },
    quote: { label: "Alıntı", icon: <Quote className="h-4 w-4" /> },
  }

  return (
    <ToolbarContext
      activeEditor={activeEditor}
      $updateToolbar={$updateToolbar}
      blockType={blockType}
      setBlockType={setBlockType}
      showModal={() => {}}
    >
      <div className="sticky top-0 z-10 border-b border-border bg-background p-2">
        <div className="flex flex-wrap items-center gap-1">
        {/* Geri al / İleri al */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
          }}
          title="Geri al (Ctrl+Z)"
          className="h-8 w-8 p-0"
          disabled={!canUndo}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(REDO_COMMAND, undefined)
          }}
          title="Yinele (Ctrl+Y)"
          className="h-8 w-8 p-0"
          disabled={!canRedo}
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Divider />

        {/* Blok formatları */}
        <Select
          value={blockType}
          onValueChange={(value) => {
            if (value === "paragraph") {
              formatParagraph()
            } else if (value === "h1" || value === "h2" || value === "h3") {
              formatHeading(value)
            } else if (value === "bullet") {
              formatBulletList()
            } else if (value === "number") {
              formatNumberedList()
            } else if (value === "quote") {
              formatQuote()
            }
          }}
        >
          <SelectTrigger className="w-36 h-8">
            <div className="flex items-center gap-2">
              {blockTypeToBlockName[blockType]?.icon}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">
              <div className="flex items-center gap-2">
                <Text className="h-4 w-4" />
                Normal
              </div>
            </SelectItem>
            <SelectItem value="h1">
              <div className="flex items-center gap-2">
                <Heading1 className="h-4 w-4" />
                Başlık 1
              </div>
            </SelectItem>
            <SelectItem value="h2">
              <div className="flex items-center gap-2">
                <Heading2 className="h-4 w-4" />
                Başlık 2
              </div>
            </SelectItem>
            <SelectItem value="h3">
              <div className="flex items-center gap-2">
                <Heading3 className="h-4 w-4" />
                Başlık 3
              </div>
            </SelectItem>
            <SelectItem value="bullet">
              <div className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Madde İşaretli
              </div>
            </SelectItem>
            <SelectItem value="number">
              <div className="flex items-center gap-2">
                <ListOrdered className="h-4 w-4" />
                Numaralı Liste
              </div>
            </SelectItem>
            <SelectItem value="quote">
              <div className="flex items-center gap-2">
                <Quote className="h-4 w-4" />
                Alıntı
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Divider />

        {/* Metin formatları */}
        <Button
          variant={isBold ? "secondary" : "ghost"}
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
          }}
          title="Kalın (Ctrl+B)"
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={isItalic ? "secondary" : "ghost"}
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
          }}
          title="İtalik (Ctrl+I)"
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={isUnderline ? "secondary" : "ghost"}
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }}
          title="Altı çizili (Ctrl+U)"
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant={isStrikethrough ? "secondary" : "ghost"}
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
          }}
          title="Üstü çizili"
          className="h-8 w-8 p-0"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant={isCode ? "secondary" : "ghost"}
          size="sm"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
          }}
          title="Kod (Ctrl+`)"
          className="h-8 w-8 p-0"
        >
          <Code className="h-4 w-4" />
        </Button>

        <Divider />

        {/* Liste butonları */}
        <Button
          variant={blockType === "bullet" ? "secondary" : "ghost"}
          size="sm"
          onClick={formatBulletList}
          title="Madde işaretli liste"
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={blockType === "number" ? "secondary" : "ghost"}
          size="sm"
          onClick={formatNumberedList}
          title="Numaralı liste"
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant={blockType === "quote" ? "secondary" : "ghost"}
          size="sm"
          onClick={formatQuote}
          title="Alıntı"
          className="h-8 w-8 p-0"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Divider />

        {/* Ekleme araçları */}
        <Button
          variant="ghost"
          size="sm"
          onClick={insertHorizontalRule}
          title="Yatay çizgi"
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Bağlantı ekle (Ctrl+K)"
          className="h-8 w-8 p-0"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Görsel ekle"
          className="h-8 w-8 p-0"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Tablo ekle"
          className="h-8 w-8 p-0"
        >
          <Table className="h-4 w-4" />
        </Button>

        <Divider />

        {/* Gelişmiş araçlar */}
        <Button
          variant="ghost"
          size="sm"
          title="Metin rengi"
          className="h-8 w-8 p-0"
        >
          <Palette className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Daha fazla"
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

        {/* Render children if provided */}
        {children && children({ blockType })}
      </div>
    </ToolbarContext>
  )
}