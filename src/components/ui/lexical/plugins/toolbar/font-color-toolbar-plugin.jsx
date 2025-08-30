"use client"

import { useCallback, useState, useEffect } from "react"
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection"
import { $getSelection, $isRangeSelection } from "lexical"
import { Palette } from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import ColorPicker from "../../editor-ui/colorpicker"

export function FontColorToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [fontColor, setFontColor] = useState("#000000")

  const $updateToolbar = (selection) => {
    if ($isRangeSelection(selection)) {
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000000")
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

  const onFontColorSelect = useCallback(
    (value, skipHistoryStack) => {
      applyStyleText({ color: value }, skipHistoryStack)
    },
    [applyStyleText]
  )

  return (
    <ColorPicker
      icon={<Palette className="h-4 w-4" />}
      color={fontColor}
      onChange={onFontColorSelect}
      title="Metin rengi"
    />
  )
}