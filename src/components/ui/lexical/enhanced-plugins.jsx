"use client"

import { useState, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_CRITICAL } from "lexical"
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin"
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin"
import { TablePlugin } from "@lexical/react/LexicalTablePlugin"

import { ContentEditable } from "./editor-ui/content-editable"
// Enhanced toolbar with all features
import { BlockFormatDropDown } from "./plugins/toolbar/block-format-toolbar-plugin"
import { FormatParagraph } from "./plugins/toolbar/block-format/format-paragraph"
import { FormatHeading } from "./plugins/toolbar/block-format/format-heading"
import { FormatBulletedList } from "./plugins/toolbar/block-format/format-bulleted-list"
import { FormatNumberedList } from "./plugins/toolbar/block-format/format-numbered-list"
import { FormatQuote } from "./plugins/toolbar/block-format/format-quote"
import { HistoryToolbarPlugin } from "./plugins/toolbar/history-toolbar-plugin"
import { FontFormatToolbarPlugin } from "./plugins/toolbar/font-format-toolbar-plugin"
import { LinkToolbarPlugin } from "./plugins/toolbar/link-toolbar-plugin"
import { FontColorToolbarPlugin } from "./plugins/toolbar/font-color-toolbar-plugin"
import { InsertImageToolbarPlugin } from "./plugins/toolbar/insert-image-toolbar-plugin"
import { InsertTableToolbarPlugin } from "./plugins/toolbar/insert-table-toolbar-plugin"
import { ImagePlugin } from "./plugins/image-plugin"
import { DragDropImagePlugin } from "./plugins/drag-drop-image-plugin"
import { EmojiPlugin } from "./plugins/emoji-plugin"
import { MentionPlugin } from "./plugins/mention-plugin"
import { EquationPlugin } from "./plugins/equation-plugin"
import { ExcalidrawPlugin } from "./plugins/excalidraw-plugin"
import { PollPlugin } from "./plugins/poll-plugin"
import { PageBreakPlugin } from "./plugins/page-break-plugin"
import { KeywordPlugin } from "./plugins/keyword-plugin"
import { InlineImagePlugin } from "./plugins/inline-image-plugin"
import { CollapsiblePlugin } from "./plugins/collapsible-plugin"
import { LayoutPlugin } from "./plugins/layout-plugin"
import { AutocompletePlugin } from "./plugins/autocomplete-plugin"
import { AutoLinkPlugin } from "./plugins/auto-link-plugin"
import { LinkPlugin } from "./plugins/link-plugin"
import { FloatingLinkEditorPlugin } from "./plugins/floating-link-editor-plugin"
import { FloatingTextFormatPlugin } from "./plugins/floating-text-format-plugin"
import { ComponentPickerMenuPlugin } from "./plugins/component-picker-menu-plugin"
import { DraggableBlockPlugin } from "./plugins/draggable-block-plugin"
import { CodeHighlightPlugin } from "./plugins/code-highlight-plugin"
import { Separator } from "@/components/ui/separator"
import { ToolbarContext } from "./context/toolbar-context"

// Import transformers
import { EMOJI } from "./transformers/markdown-emoji-transformer"
import { EQUATION } from "./transformers/markdown-equation-transformer"
import { HR } from "./transformers/markdown-hr-transformer"
import { IMAGE } from "./transformers/markdown-image-transformer"
import { TABLE } from "./transformers/markdown-table-transformer"

const maxLength = 5000

export function EnhancedPlugins({ placeholder = "İçeriğinizi yazın..." }) {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null)
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState("paragraph")

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  const $updateToolbar = () => {}

  useEffect(() => {
    return editor.registerCommand(
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
      showModal={() => {}}
    >
      <div className="relative">
        {/* Enhanced Toolbar */}
        <div className="sticky top-0 z-10 border-b border-border bg-background p-2">
        <div className="flex flex-wrap items-center gap-1">
          <HistoryToolbarPlugin />
          <Separator orientation="vertical" className="h-8" />
          
          <BlockFormatDropDown>
            <FormatParagraph />
            <FormatHeading levels={["h1", "h2", "h3"]} />
            <FormatNumberedList />
            <FormatBulletedList />
            <FormatQuote />
          </BlockFormatDropDown>
          
          <Separator orientation="vertical" className="h-8" />
          
          <FontFormatToolbarPlugin format="bold" />
          <FontFormatToolbarPlugin format="italic" />
          <FontFormatToolbarPlugin format="underline" />
          <FontFormatToolbarPlugin format="strikethrough" />
          <FontFormatToolbarPlugin format="code" />
          
          <Separator orientation="vertical" className="h-8" />
          
          <LinkToolbarPlugin />
          <FontColorToolbarPlugin />
          
          <Separator orientation="vertical" className="h-8" />
          
          <InsertImageToolbarPlugin />
          <InsertTableToolbarPlugin />
        </div>
      </div>
      
      <div className="relative">
        <AutoFocusPlugin />
        <RichTextPlugin
          contentEditable={
            <div className="relative">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block min-h-[400px] overflow-auto px-8 py-4 focus:outline-none border-2 border-dashed border-transparent hover:border-blue-200 transition-colors"
                  placeholderClassName="text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-8 py-[18px] text-ellipsis select-none"
                />
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
                💡 Görselleri sürükleyip bırakabilirsiniz • / ile komut menüsünü açın
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* Core Lexical Plugins */}
        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TablePlugin />
        <ListPlugin />
        <TabIndentationPlugin />
        <HashtagPlugin />
        <HistoryPlugin />

        {/* Enhanced Plugins */}
        <ImagePlugin />
        <DragDropImagePlugin />
        <EmojiPlugin />
        <MentionPlugin />
        <EquationPlugin />
        <ExcalidrawPlugin />
        <PollPlugin />
        <PageBreakPlugin />
        <KeywordPlugin />
        <InlineImagePlugin />
        <CollapsiblePlugin />
        <LayoutPlugin />
        <AutocompletePlugin />
        <AutoLinkPlugin />
        <LinkPlugin />
        <CodeHighlightPlugin />

        {/* Floating Plugins */}
        {floatingAnchorElem && (
          <>
            <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
            <FloatingTextFormatPlugin anchorElem={floatingAnchorElem} />
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
        
        <ComponentPickerMenuPlugin />

        {/* Markdown Support with all transformers */}
        <MarkdownShortcutPlugin
          transformers={[
            TABLE,
            HR,
            IMAGE,
            EMOJI,
            EQUATION,
            CHECK_LIST,
            ...ELEMENT_TRANSFORMERS,
            ...MULTILINE_ELEMENT_TRANSFORMERS,
            ...TEXT_FORMAT_TRANSFORMERS,
            ...TEXT_MATCH_TRANSFORMERS,
          ]}
        />
      </div>
      
      {/* Enhanced bottom toolbar */}
      <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1 bg-background">
        <div className="flex flex-1 justify-start">
          <span className="text-xs text-muted-foreground">
            Gelişmiş editör • Markdown • Emoji • Çizim • Tablo • Matematik
          </span>
        </div>
        <div className="flex flex-1 justify-end">
          <span className="text-xs text-muted-foreground">
            Karakter limiti: {maxLength}
          </span>
          </div>
        </div>
      </div>
    </ToolbarContext>
  )
}