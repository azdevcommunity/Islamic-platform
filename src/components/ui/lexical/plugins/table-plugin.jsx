"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createTableNodeWithDimensions,
  INSERT_TABLE_COMMAND,
  TableNode,
} from "@lexical/table"
import {
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const INSERT_NEW_TABLE_COMMAND = createCommand("INSERT_NEW_TABLE_COMMAND")

export const CellContext = createContext({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
})

export function TableContext({ children }) {
  const [contextValue, setContextValue] = useState({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  })
  return (
    <CellContext.Provider
      value={useMemo(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins })
          },
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins]
      )}
    >
      {children}
    </CellContext.Provider>
  )
}

export function InsertTableDialog({ activeEditor, onClose }) {
  const [rows, setRows] = useState("5")
  const [columns, setColumns] = useState("5")
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const row = Number(rows)
    const column = Number(columns)
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [rows, columns])

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns,
      rows,
    })

    onClose()
  }

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="rows">Number of rows</Label>
          <Input
            id="rows"
            placeholder={"# of rows (1-500)"}
            onChange={(e) => setRows(e.target.value)}
            value={rows}
            data-test-id="table-modal-rows"
            type="number"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="columns">Number of columns</Label>
          <Input
            id="columns"
            placeholder={"# of columns (1-50)"}
            onChange={(e) => setColumns(e.target.value)}
            value={columns}
            data-test-id="table-modal-columns"
            type="number"
          />
        </div>
      </div>
      <DialogFooter data-test-id="table-model-confirm-insert">
        <Button disabled={isDisabled} onClick={onClick}>
          Confirm
        </Button>
      </DialogFooter>
    </>
  )
}

export function TablePlugin({ cellEditorConfig, children }) {
  const [editor] = useLexicalComposerContext()
  const cellContext = useContext(CellContext)

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      throw new Error("TablePlugin: TableNode is not registered on editor")
    }

    cellContext.set(cellEditorConfig, children)

    return editor.registerCommand(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const tableNode = $createTableNodeWithDimensions(
          Number(rows),
          Number(columns),
          includeHeaders
        )
        $insertNodes([tableNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [cellContext, cellEditorConfig, children, editor])

  return null
}