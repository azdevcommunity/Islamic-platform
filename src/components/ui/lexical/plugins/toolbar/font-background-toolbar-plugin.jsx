"use client"

import { useCallback, useState } from "react"
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection"
import { $getSelection, $isRangeSelection } from "lexical"
import { PaintBucketIcon } from "lucide-react"

import { useToolbarContext } from "@/components/ui/lexical/context/toolbar-context"
import { useUpdateToolbar } from "@/components/ui/lexical/hooks/use-update-toolbar"
import { ColorPicker } from "@/components/ui/lexical/editor-ui/colorpicker"

export function FontBackgroundToolbarPlugin() {
  const { activeEditor } = useToolbarContext()

  const [bgColor, setBgColor] = useState("#fff")

  const $updateToolbar = (selection) => {
    if ($isRangeSelection(selection)) {
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        )
      )
    }
  }

  useUpdateToolbar($updateToolbar)

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

  const onBgColorSelect = useCallback(
    (value, skipHistoryStack) => {
      applyStyleText({ "background-color": value }, skipHistoryStack)
    },
    [applyStyleText]
  )

  return (
    <ColorPicker
      icon={<PaintBucketIcon className="size-4" />}
      color={bgColor}
      onChange={onBgColorSelect}
      title="text background color"
    />
  )
}