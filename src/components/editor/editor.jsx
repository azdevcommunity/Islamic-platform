"use client"

import {
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { FloatingLinkContext } from "@/components/ui/lexical/context/floating-link-context"
import { SharedAutocompleteContext } from "@/components/ui/lexical/context/shared-autocomplete-context"
import { editorTheme } from "@/components/ui/lexical/themes/editor-theme"
import { TooltipProvider } from "@/components/ui/tooltip"

import { nodes } from "./nodes"
import { Plugins } from "./plugins"

function OnChangePluginWithEditor({ onChange, onSerializedChange }) {
  const [editor] = useLexicalComposerContext()
  
  return (
    <OnChangePlugin
      ignoreSelectionChange={true}
      onChange={(editorState) => {
        console.log("OnChangePlugin triggered - editorState:", editorState, "editor:", editor)
        onChange?.(editorState, editor)
        onSerializedChange?.(editorState.toJSON())
      }}
    />
  )
}

const editorConfig = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error) => {
    console.error(error)
  },
}

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
}) {
  return (
    <div className="bg-background overflow-hidden rounded-lg border">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              <Plugins />

              <OnChangePluginWithEditor 
                onChange={onChange}
                onSerializedChange={onSerializedChange}
              />
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}