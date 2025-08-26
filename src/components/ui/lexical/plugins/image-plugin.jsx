"use client"

import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes, $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from "lexical"
import { $createParagraphNode, $createTextNode } from "lexical"

export const INSERT_IMAGE_COMMAND = "INSERT_IMAGE_COMMAND"

export function ImagePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const { src, alt = "Image" } = payload
        
        editor.update(() => {
          const selection = $getSelection()
          
          if ($isRangeSelection(selection)) {
            // HTML img elementi oluştur
            const imgHTML = `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;" />`
            
            // Yeni paragraf oluştur ve HTML'i ekle
            const paragraph = $createParagraphNode()
            const textNode = $createTextNode('')
            paragraph.append(textNode)
            
            // Selection'a HTML ekle
            selection.insertRawText(imgHTML)
          }
        })
        
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}