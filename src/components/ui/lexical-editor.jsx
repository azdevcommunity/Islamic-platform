"use client"

import {
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { $generateHtmlFromNodes } from "@lexical/html"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Import all the necessary components
import { FloatingLinkContext } from "./lexical/context/floating-link-context"
import { SharedAutocompleteContext } from "./lexical/context/shared-autocomplete-context"
import { editorTheme } from "./lexical/themes/editor-theme"
import { nodes } from "./lexical/nodes"
import { AdvancedPlugins } from "./lexical/advanced-plugins"

const editorConfig = {
  namespace: "ArticleEditor",
  theme: editorTheme,
  nodes,
  onError: (error) => {
    console.error(error)
  },
}

export function LexicalEditor({
  content = '',
  onChange,
  placeholder = 'İçeriğinizi yazın...',
  className,
  editable = true,
  ...props
}) {
  const handleChange = (newEditorState, editor) => {
    if (onChange) {
      newEditorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        console.log('Editor Content:', htmlString)
        console.log('Editor State:', newEditorState)
        onChange(htmlString)
      })
    }
  }

  return (
    <div
      className={cn(
        'border border-border rounded-md bg-background focus-within:border-ring transition-colors overflow-hidden',
        className
      )}
      {...props}
    >
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editable,
        }}
      >
        <SharedAutocompleteContext>
          <FloatingLinkContext>
            <AdvancedPlugins placeholder={placeholder} />
            
            <OnChangePlugin
              ignoreSelectionChange={true}
              onChange={handleChange}
            />
          </FloatingLinkContext>
        </SharedAutocompleteContext>
      </LexicalComposer>
    </div>
  )
}