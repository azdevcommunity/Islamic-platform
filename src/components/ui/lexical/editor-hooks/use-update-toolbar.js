import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical"

import { useToolbarContext } from "../context/toolbar-context"

export function useUpdateToolbarHandler(callback) {
  const [editor] = useLexicalComposerContext()
  const { activeEditor } = useToolbarContext()

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection()
        if (selection) {
          callback(selection)
        }
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [activeEditor, callback])

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      const selection = $getSelection()
      if (selection) {
        callback(selection)
      }
    })
  }, [activeEditor, callback])
}