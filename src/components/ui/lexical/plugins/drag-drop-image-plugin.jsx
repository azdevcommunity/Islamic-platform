"use client"

import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { INSERT_IMAGE_COMMAND } from "./image-plugin"

export function DragDropImagePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const files = Array.from(e.dataTransfer.files)
      const imageFiles = files.filter(file => file.type.startsWith('image/'))

      imageFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const src = e.target.result
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src,
            alt: file.name || "Dropped image"
          })
        }
        reader.readAsDataURL(file)
      })
    }

    const editorElement = editor.getRootElement()
    if (editorElement) {
      editorElement.addEventListener('dragover', handleDragOver)
      editorElement.addEventListener('drop', handleDrop)

      return () => {
        editorElement.removeEventListener('dragover', handleDragOver)
        editorElement.removeEventListener('drop', handleDrop)
      }
    }
  }, [editor])

  return null
}