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
import { Separator } from "@/components/ui/separator"

export function AdvancedToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState("paragraph")
  const [modal, showModal] = useEditorModal()

  const $updateToolbar = () => {}

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

      <div className="border-b border-border p-2">
        <div className="flex flex-wrap items-center gap-1">
          <HistoryToolbarPlugin />
          <Separator orientation="vertical" className="mx-1 h-6" />
          
          <BlockFormatDropDown />
          <Separator orientation="vertical" className="mx-1 h-6" />
          
          <FontFormatToolbarPlugin format="bold" />
          <FontFormatToolbarPlugin format="italic" />
          <FontFormatToolbarPlugin format="underline" />
          <FontFormatToolbarPlugin format="strikethrough" />
          <FontFormatToolbarPlugin format="code" />
          <Separator orientation="vertical" className="mx-1 h-6" />
          
          <LinkToolbarPlugin />
        </div>
      </div>
    </ToolbarContext>
  )
}