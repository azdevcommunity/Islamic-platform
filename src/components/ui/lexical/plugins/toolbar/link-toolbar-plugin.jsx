"use client"

import { useCallback, useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $findMatchingParent, mergeRegister } from "@lexical/utils"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical"
import { Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useFloatingLinkContext } from "../../context/floating-link-context"
import { getSelectedNode } from "../../utils/get-selected-node"

export function LinkToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isLink, setIsLink] = useState(false)
  const { isLinkEditMode, setIsLinkEditMode } = useFloatingLinkContext()
  
  console.log("LinkToolbarPlugin render - isLink:", isLink, "isLinkEditMode:", isLinkEditMode)

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const linkParent = $findMatchingParent(node, $isLinkNode)
      setIsLink(!!linkParent)
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar()
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, $updateToolbar])

  const insertLink = useCallback(() => {
    console.log("=== LINK BUTTON CLICKED ===")
    console.log("Current isLink state:", isLink)
    console.log("Current isLinkEditMode:", isLinkEditMode)
    
    // Check if there's a selection
    editor.getEditorState().read(() => {
      const selection = $getSelection()
      console.log("Current selection:", selection)
      
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent()
        console.log("Selected text:", selectedText)
        
        if (selectedText.length === 0) {
          console.log("No text selected, cannot create link")
          alert("Link oluşturmak için önce metin seçin!")
          return
        }
      } else {
        console.log("No range selection, cannot create link")
        alert("Link oluşturmak için önce metin seçin!")
        return
      }
    })
    
    if (!isLink) {
      console.log("LinkToolbarPlugin - insertLink called, setting isLinkEditMode to true")
      setIsLinkEditMode(true)
    } else {
      console.log("LinkToolbarPlugin - removing link")
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink, setIsLinkEditMode, isLinkEditMode])

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={insertLink}
      className={`h-8 w-8 p-0 ${isLink ? 'bg-accent text-accent-foreground' : ''}`}
      title={isLink ? "Linki kaldır" : "Link ekle"}
    >
      <Link className="h-4 w-4" />
    </Button>
  )
}