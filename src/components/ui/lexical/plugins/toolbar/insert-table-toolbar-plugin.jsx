"use client"

import { useCallback } from "react"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { Table } from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import { Button } from "@/components/ui/button"

export function InsertTableToolbarPlugin() {
  const { activeEditor } = useToolbarContext()

  const insertTable = useCallback(() => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: "3",
      rows: "3",
      includeHeaders: true,
    })
  }, [activeEditor])

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={insertTable}
      title="Tablo ekle (3x3)"
      className="h-8 w-8 p-0"
    >
      <Table className="h-4 w-4" />
    </Button>
  )
}