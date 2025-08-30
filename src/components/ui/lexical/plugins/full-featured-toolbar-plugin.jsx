"use client"

import { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical"

import { ToolbarContext } from "../context/toolbar-context"
import { useEditorModal } from "../hooks/use-modal"
import { HistoryToolbarPlugin } from "./toolbar/history-toolbar-plugin"
import { FontFormatToolbarPlugin } from "./toolbar/font-format-toolbar-plugin"
import { BlockFormatDropDown } from "./toolbar/block-format-toolbar-plugin"
import { LinkToolbarPlugin } from "./toolbar/link-toolbar-plugin"
import { FontColorToolbarPlugin } from "./toolbar/font-color-toolbar-plugin"
import { FontSizeToolbarPlugin } from "./toolbar/font-size-toolbar-plugin"
import { ElementFormatToolbarPlugin } from "./toolbar/element-format-toolbar-plugin"
import { BlockInsertToolbarPlugin } from "./toolbar/block-insert-toolbar-plugin"
import { Separator } from "@/components/ui/separator"

export function FullFeaturedToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState("paragraph")
  const [modal, showModal] = useEditorModal()

  const $updateToolbar = () => { }

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor])

  return (
    <ToolbarContext
      activeEditor={activeEditor}
      $updateToolbar={$updateToolbar}
      blockType={blockType}
      setBlockType={setBlockType}
      showModal={showModal}
    >
      {modal}

      <div className="sticky top-0 z-10 border-b bg-background p-2">
        {/* İlk satır - Temel formatlar */}
        <div className="flex flex-wrap items-center gap-1 mb-2">
          <HistoryToolbarPlugin />
          <Separator orientation="vertical" className="mx-1 h-6" />

          <BlockFormatDropDown />
          <Separator orientation="vertical" className="mx-1 h-6" />

          <FontSizeToolbarPlugin />
          <Separator orientation="vertical" className="mx-1 h-6" />

          <FontFormatToolbarPlugin format="bold" />
          <FontFormatToolbarPlugin format="italic" />
          <FontFormatToolbarPlugin format="underline" />
          <FontFormatToolbarPlugin format="strikethrough" />
          <FontFormatToolbarPlugin format="code" />

          <Separator orientation="vertical" className="mx-1 h-6" />

          <FontColorToolbarPlugin />
          <LinkToolbarPlugin />
        </div>

        {/* İkinci satır - Gelişmiş özellikler */}
        <div className="flex flex-wrap items-center gap-1">
          <ElementFormatToolbarPlugin />
          <Separator orientation="vertical" className="mx-1 h-6" />

          <BlockInsertToolbarPlugin />
        </div>
      </div>
    </ToolbarContext>
  )
}