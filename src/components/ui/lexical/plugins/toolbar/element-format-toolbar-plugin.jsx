"use client"

import { useState } from "react"
import { $isRangeSelection } from "lexical"
import { FORMAT_ELEMENT_COMMAND } from "lexical"
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import { useUpdateToolbarHandler } from "../../hooks/use-update-toolbar"
import { Button } from "@/components/ui/button"

export function ElementFormatToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [elementFormat, setElementFormat] = useState("left")

  const $updateToolbar = (selection) => {
    if ($isRangeSelection(selection)) {
      // Element format güncelleme mantığı buraya eklenebilir
    }
  }

  useUpdateToolbarHandler($updateToolbar)

  const formatElement = (format) => {
    activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format)
    setElementFormat(format)
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={elementFormat === "left" ? "default" : "outline"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => formatElement("left")}
        title="Sola hizala"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant={elementFormat === "center" ? "default" : "outline"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => formatElement("center")}
        title="Ortala"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant={elementFormat === "right" ? "default" : "outline"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => formatElement("right")}
        title="Sağa hizala"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        variant={elementFormat === "justify" ? "default" : "outline"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => formatElement("justify")}
        title="İki yana yasla"
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
    </div>
  )
}