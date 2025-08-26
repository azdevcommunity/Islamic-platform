"use client"

import { useEffect, useState } from "react"
import {
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from "lexical"
import { Undo, Redo } from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import { Button } from "@/components/ui/button"

export function HistoryToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    const unregisterUndo = activeEditor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )

    const unregisterRedo = activeEditor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )

    return () => {
      unregisterUndo()
      unregisterRedo()
    }
  }, [activeEditor])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        title="Geri al (Ctrl+Z)"
        className="h-8 w-8 p-0"
        disabled={!canUndo}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        title="Yinele (Ctrl+Y)"
        className="h-8 w-8 p-0"
        disabled={!canRedo}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </>
  )
}