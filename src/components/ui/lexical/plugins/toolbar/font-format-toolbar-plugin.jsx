"use client"

import { useEffect, useState } from "react"
import { FORMAT_TEXT_COMMAND, $isRangeSelection, $getSelection } from "lexical"
import { Bold, Italic, Underline, Strikethrough, Code } from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import { Button } from "@/components/ui/button"

const formatIcons = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  code: Code,
}

const formatTitles = {
  bold: "Kalın (Ctrl+B)",
  italic: "İtalik (Ctrl+I)",
  underline: "Altı çizili (Ctrl+U)",
  strikethrough: "Üstü çizili",
  code: "Kod (Ctrl+`)",
}

export function FontFormatToolbarPlugin({ format }) {
  const { activeEditor } = useToolbarContext()
  const [isActive, setIsActive] = useState(false)
  const IconComponent = formatIcons[format]

  useEffect(() => {
    return activeEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          setIsActive(selection.hasFormat(format))
        }
      })
    })
  }, [activeEditor, format])

  const handleClick = () => {
    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      onClick={handleClick}
      title={formatTitles[format]}
      className="h-8 w-8 p-0"
    >
      <IconComponent className="h-4 w-4" />
    </Button>
  )
}