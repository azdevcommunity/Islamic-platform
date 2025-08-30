"use client"

import { useCallback, useEffect, useState } from "react"
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection"
import { $getSelection, $isRangeSelection } from "lexical"

import { useToolbarContext } from "../../context/toolbar-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FONT_SIZE_OPTIONS = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
  ["24px", "24px"],
  ["28px", "28px"],
  ["32px", "32px"],
  ["36px", "36px"],
  ["48px", "48px"],
  ["64px", "64px"],
  ["72px", "72px"],
]

export function FontSizeToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [fontSize, setFontSize] = useState("16px")

  const $updateToolbar = (selection) => {
    if ($isRangeSelection(selection)) {
      setFontSize(
        $getSelectionStyleValueForProperty(selection, "font-size", "16px")
      )
    }
  }

  useEffect(() => {
    return activeEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if (selection) {
          $updateToolbar(selection)
        }
      })
    })
  }, [activeEditor])

  const applyStyleText = useCallback(
    (styles, skipHistoryStack) => {
      activeEditor.update(
        () => {
          const selection = $getSelection()
          if (selection !== null) {
            $patchStyleText(selection, styles)
          }
        },
        skipHistoryStack ? { tag: "historic" } : {}
      )
    },
    [activeEditor]
  )

  const onFontSizeSelect = useCallback(
    (value) => {
      applyStyleText({ "font-size": value }, false)
    },
    [applyStyleText]
  )

  return (
    <Select value={fontSize} onValueChange={onFontSizeSelect}>
      <SelectTrigger className="w-20 h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {FONT_SIZE_OPTIONS.map(([option, text]) => (
          <SelectItem key={option} value={option}>
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}