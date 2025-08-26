import { useState } from "react"
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

import { ContentEditable } from "@/components/ui/lexical/editor-ui/content-editable"
import { ActionsPlugin } from "@/components/ui/lexical/plugins/actions/actions-plugin"
import { CharacterLimitPlugin } from "@/components/ui/lexical/plugins/actions/character-limit-plugin"
import { ClearEditorActionPlugin } from "@/components/ui/lexical/plugins/actions/clear-editor-plugin"
import { CounterCharacterPlugin } from "@/components/ui/lexical/plugins/actions/counter-character-plugin"
import { EditModeTogglePlugin } from "@/components/ui/lexical/plugins/actions/edit-mode-toggle-plugin"
import { ImportExportPlugin } from "@/components/ui/lexical/plugins/actions/import-export-plugin"
import { MarkdownTogglePlugin } from "@/components/ui/lexical/plugins/actions/markdown-toggle-plugin"
import { MaxLengthPlugin } from "@/components/ui/lexical/plugins/actions/max-length-plugin"
import { ShareContentPlugin } from "@/components/ui/lexical/plugins/actions/share-content-plugin"
import { SpeechToTextPlugin } from "@/components/ui/lexical/plugins/actions/speech-to-text-plugin"
import { TreeViewPlugin } from "@/components/ui/lexical/plugins/actions/tree-view-plugin"
import { AutoLinkPlugin } from "@/components/ui/lexical/plugins/auto-link-plugin"
import { AutocompletePlugin } from "@/components/ui/lexical/plugins/autocomplete-plugin"
import { CodeActionMenuPlugin } from "@/components/ui/lexical/plugins/code-action-menu-plugin"
import { CodeHighlightPlugin } from "@/components/ui/lexical/plugins/code-highlight-plugin"
import { CollapsiblePlugin } from "@/components/ui/lexical/plugins/collapsible-plugin"
import { ComponentPickerMenuPlugin } from "@/components/ui/lexical/plugins/component-picker-menu-plugin"
import { ContextMenuPlugin } from "@/components/ui/lexical/plugins/context-menu-plugin"
import { DragDropPastePlugin } from "@/components/ui/lexical/plugins/drag-drop-paste-plugin"
import { DraggableBlockPlugin } from "@/components/ui/lexical/plugins/draggable-block-plugin"
import { EmojiPickerPlugin } from "@/components/ui/lexical/plugins/emoji-picker-plugin"
import { EmojisPlugin } from "@/components/ui/lexical/plugins/emojis-plugin"
import { EquationsPlugin } from "@/components/ui/lexical/plugins/equations-plugin"
import { ExcalidrawPlugin } from "@/components/ui/lexical/plugins/excalidraw-plugin"
import { FloatingLinkEditorPlugin } from "@/components/ui/lexical/plugins/floating-link-editor-plugin"
import { FloatingTextFormatToolbarPlugin } from "@/components/ui/lexical/plugins/floating-text-format-plugin"
import { ImagesPlugin } from "@/components/ui/lexical/plugins/images-plugin"
import { InlineImagePlugin } from "@/components/ui/lexical/plugins/inline-image-plugin"
import { KeywordsPlugin } from "@/components/ui/lexical/plugins/keywords-plugin"
import { LayoutPlugin } from "@/components/ui/lexical/plugins/layout-plugin"
import { LinkPlugin } from "@/components/ui/lexical/plugins/link-plugin"
import { ListMaxIndentLevelPlugin } from "@/components/ui/lexical/plugins/list-max-indent-level-plugin"
import { MentionsPlugin } from "@/components/ui/lexical/plugins/mentions-plugin"
import { PageBreakPlugin } from "@/components/ui/lexical/plugins/page-break-plugin"
import { PollPlugin } from "@/components/ui/lexical/plugins/poll-plugin"
import { TabFocusPlugin } from "@/components/ui/lexical/plugins/tab-focus-plugin"
import { TableActionMenuPlugin } from "@/components/ui/lexical/plugins/table-action-menu-plugin"
import { TableCellResizerPlugin } from "@/components/ui/lexical/plugins/table-cell-resizer-plugin"
import { TableHoverActionsPlugin } from "@/components/ui/lexical/plugins/table-hover-actions-plugin"
import { BlockFormatDropDown } from "@/components/ui/lexical/plugins/toolbar/block-format-toolbar-plugin"
import { FormatBulletedList } from "@/components/ui/lexical/plugins/toolbar/block-format/format-bulleted-list"
import { FormatCheckList } from "@/components/ui/lexical/plugins/toolbar/block-format/format-check-list"
import { FormatCodeBlock } from "@/components/ui/lexical/plugins/toolbar/block-format/format-code-block"
import { FormatHeading } from "@/components/ui/lexical/plugins/toolbar/block-format/format-heading"
import { FormatNumberedList } from "@/components/ui/lexical/plugins/toolbar/block-format/format-numbered-list"
import { FormatParagraph } from "@/components/ui/lexical/plugins/toolbar/block-format/format-paragraph"
import { FormatQuote } from "@/components/ui/lexical/plugins/toolbar/block-format/format-quote"
import { BlockInsertPlugin } from "@/components/ui/lexical/plugins/toolbar/block-insert-plugin"
import { InsertCollapsibleContainer } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-collapsible-container"
import { InsertColumnsLayout } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-columns-layout"
import { InsertExcalidraw } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-excalidraw"
import { InsertHorizontalRule } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-horizontal-rule"
import { InsertImage } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-image"
import { InsertInlineImage } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-inline-image"
import { InsertPageBreak } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-page-break"
import { InsertPoll } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-poll"
import { InsertTable } from "@/components/ui/lexical/plugins/toolbar/block-insert/insert-table"
import { ClearFormattingToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/clear-formatting-toolbar-plugin"
import { CodeLanguageToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/code-language-toolbar-plugin"
import { ElementFormatToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/element-format-toolbar-plugin"
import { FontBackgroundToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/font-background-toolbar-plugin"
import { FontColorToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/font-color-toolbar-plugin"
import { FontFamilyToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/font-family-toolbar-plugin"
import { FontFormatToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/font-format-toolbar-plugin"
import { FontSizeToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/font-size-toolbar-plugin"
import { HistoryToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/history-toolbar-plugin"
import { LinkToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/link-toolbar-plugin"
import { SubSuperToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/subsuper-toolbar-plugin"
import { ToolbarPlugin } from "@/components/ui/lexical/plugins/toolbar/toolbar-plugin"
import { TypingPerfPlugin } from "@/components/ui/lexical/plugins/typing-pref-plugin"
import { EMOJI } from "@/components/ui/lexical/transformers/markdown-emoji-transformer"
import { EQUATION } from "@/components/ui/lexical/transformers/markdown-equation-transformer"
import { HR } from "@/components/ui/lexical/transformers/markdown-hr-transformer"
import { IMAGE } from "@/components/ui/lexical/transformers/markdown-image-transformer"
import { TABLE } from "@/components/ui/lexical/transformers/markdown-table-transformer"
import { Separator } from "@/components/ui/separator"

const placeholder = "İçeriğinizi yazın... (/ ile komutları açın)"
const maxLength = 5000

export function Plugins() {
    const [floatingAnchorElem, setFloatingAnchorElem] = useState(null)

    const onRef = (_floatingAnchorElem) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem)
        }
    }

    return (
        <div className="relative">
            <ToolbarPlugin>
                {({ blockType }) => (
                    <div className="vertical-align-middle sticky top-0 z-10 flex items-center gap-2 overflow-auto border-b p-1">
                        <HistoryToolbarPlugin />
                        <Separator orientation="vertical" className="!h-7" />
                        <BlockFormatDropDown>
                            <FormatParagraph />
                            <FormatHeading levels={["h1", "h2", "h3"]} />
                            <FormatNumberedList />
                            <FormatBulletedList />
                            <FormatCheckList />
                            <FormatCodeBlock />
                            <FormatQuote />
                        </BlockFormatDropDown>
                        {blockType === "code" ? (
                            <CodeLanguageToolbarPlugin />
                        ) : (
                            <>
                                <FontFamilyToolbarPlugin />
                                <FontSizeToolbarPlugin />
                                <Separator orientation="vertical" className="!h-7" />
                                <FontFormatToolbarPlugin format="bold" />
                                <FontFormatToolbarPlugin format="italic" />
                                <FontFormatToolbarPlugin format="underline" />
                                <FontFormatToolbarPlugin format="strikethrough" />
                                <Separator orientation="vertical" className="!h-7" />
                                <SubSuperToolbarPlugin />
                                <LinkToolbarPlugin />
                                <Separator orientation="vertical" className="!h-7" />
                                <ClearFormattingToolbarPlugin />
                                <Separator orientation="vertical" className="!h-7" />
                                <FontColorToolbarPlugin />
                                <FontBackgroundToolbarPlugin />
                                <Separator orientation="vertical" className="!h-7" />
                                <ElementFormatToolbarPlugin />
                                <Separator orientation="vertical" className="!h-7" />
                                <BlockInsertPlugin>
                                    <InsertHorizontalRule />
                                    <InsertPageBreak />
                                    <InsertImage />
                                    <InsertInlineImage />
                                    <InsertCollapsibleContainer />
                                    <InsertExcalidraw />
                                    <InsertTable />
                                    <InsertPoll />
                                    <InsertColumnsLayout />
                                </BlockInsertPlugin>
                            </>
                        )}
                    </div>
                )}
            </ToolbarPlugin>
            <div className="relative">
                <AutoFocusPlugin />
                <RichTextPlugin
                    contentEditable={
                        <div className="">
                            <div className="" ref={onRef}>
                                <ContentEditable
                                    placeholder={placeholder}
                                    className="ContentEditable__root relative block h-[500px] min-h-[500px] overflow-auto px-8 py-4 focus:outline-none"
                                />
                            </div>
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />

                <ClickableLinkPlugin />
                <CheckListPlugin />
                <HorizontalRulePlugin />
                <TablePlugin />
                <ListPlugin />
                <TabIndentationPlugin />
                <HashtagPlugin />
                <HistoryPlugin />

                <MentionsPlugin />
                <PageBreakPlugin />
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <KeywordsPlugin />
                <EmojisPlugin />
                <ImagesPlugin />
                <InlineImagePlugin />
                <ExcalidrawPlugin />
                <TableCellResizerPlugin />
                <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
                <TableActionMenuPlugin
                    anchorElem={floatingAnchorElem}
                    cellMerge={true}
                />
                <PollPlugin />
                <LayoutPlugin />
                <EquationsPlugin />
                <CollapsiblePlugin />

                <CodeHighlightPlugin />
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />

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
                <TypingPerfPlugin />
                <TabFocusPlugin />
                <AutocompletePlugin />
                <AutoLinkPlugin />
                <LinkPlugin />

                <ComponentPickerMenuPlugin />

                <ContextMenuPlugin />
                <DragDropPastePlugin />
                <EmojiPickerPlugin />

                <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
                <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />

                <ListMaxIndentLevelPlugin />
            </div>
            <ActionsPlugin>
                <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
                    <div className="flex flex-1 justify-start">
                        <MaxLengthPlugin maxLength={maxLength} />
                        <CharacterLimitPlugin maxLength={maxLength} charset="UTF-16" />
                    </div>
                    <div>
                        <CounterCharacterPlugin charset="UTF-16" />
                    </div>
                    <div className="flex flex-1 justify-end">
                        <SpeechToTextPlugin />
                        <ShareContentPlugin />
                        <ImportExportPlugin />
                        <MarkdownTogglePlugin
                            shouldPreserveNewLinesInMarkdown={true}
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
                        <EditModeTogglePlugin />
                        <>
                            <ClearEditorActionPlugin />
                            <ClearEditorPlugin />
                        </>
                        <TreeViewPlugin />
                    </div>
                </div>
            </ActionsPlugin>
        </div>
    )
}