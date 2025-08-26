import { useMemo, useEffect } from "react"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  NodeContextMenuOption,
  NodeContextMenuPlugin as LexicalNodeContextMenuPlugin,
  NodeContextMenuSeparator,
} from "@lexical/react/LexicalNodeContextMenuPlugin"
import {
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  $isRangeSelection,
  COPY_COMMAND,
  CUT_COMMAND,
  PASTE_COMMAND,
} from "lexical"
import {
  Clipboard,
  ClipboardType,
  Copy,
  Link2Off,
  Scissors,
  Trash2,
} from "lucide-react"

export function ContextMenuPlugin() {
  const [editor] = useLexicalComposerContext()

  // Helper function to preserve scroll position
  const executeWithScrollPreservation = (callback) => {
    const editorElement = editor.getRootElement()
    const scrollContainer = editorElement?.closest('[data-lexical-editor]')?.parentElement || editorElement?.parentElement
    const scrollTop = scrollContainer?.scrollTop || 0
    
    callback()
    
    // Restore scroll position after a brief delay
    setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollTop
      }
    }, 10)
  }

  const items = useMemo(() => {
    return [
      new NodeContextMenuOption(`Remove Link`, {
        $onSelect: () => {
          executeWithScrollPreservation(() => {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
          })
        },
        $showOn: (node) => $isLinkNode(node.getParent()),
        disabled: false,
        icon: <Link2Off className="h-4 w-4" />,
      }),
      new NodeContextMenuSeparator({
        $showOn: (node) => $isLinkNode(node.getParent()),
      }),
      new NodeContextMenuOption(`Cut`, {
        $onSelect: () => {
          executeWithScrollPreservation(() => {
            editor.dispatchCommand(CUT_COMMAND, null)
          })
        },
        disabled: false,
        icon: <Scissors className="h-4 w-4" />,
      }),
      new NodeContextMenuOption(`Copy`, {
        $onSelect: () => {
          executeWithScrollPreservation(() => {
            editor.dispatchCommand(COPY_COMMAND, null)
          })
        },
        disabled: false,
        icon: <Copy className="h-4 w-4" />,
      }),
      new NodeContextMenuOption(`Paste`, {
        $onSelect: () => {
          executeWithScrollPreservation(() => {
            navigator.clipboard.read().then(async function () {
              const data = new DataTransfer()

              const readClipboardItems = await navigator.clipboard.read()
              const item = readClipboardItems[0]

              const permission = await navigator.permissions.query({
                name: "clipboard-read",
              })
              if (permission.state === "denied") {
                alert("Not allowed to paste from clipboard.")
                return
              }

              for (const type of item.types) {
                const dataString = await (await item.getType(type)).text()
                data.setData(type, dataString)
              }

              const event = new ClipboardEvent("paste", {
                clipboardData: data,
              })

              editor.dispatchCommand(PASTE_COMMAND, event)
            })
          })
        },
        disabled: false,
        icon: <Clipboard className="h-4 w-4" />,
      }),
      new NodeContextMenuOption(`Paste as Plain Text`, {
        $onSelect: () => {
          executeWithScrollPreservation(() => {
            navigator.clipboard.read().then(async function () {
              const permission = await navigator.permissions.query({
                name: "clipboard-read",
              })

              if (permission.state === "denied") {
                alert("Not allowed to paste from clipboard.")
                return
              }

              const data = new DataTransfer()
              const clipboardText = await navigator.clipboard.readText()
              data.setData("text/plain", clipboardText)

              const event = new ClipboardEvent("paste", {
                clipboardData: data,
              })
              editor.dispatchCommand(PASTE_COMMAND, event)
            })
          })
        },
        disabled: false,
        icon: <ClipboardType className="h-4 w-4" />,
      }),
      new NodeContextMenuSeparator(),
      new NodeContextMenuOption(`Delete Node`, {
        $onSelect: () => {
          executeWithScrollPreservation(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              const currentNode = selection.anchor.getNode()
              const ancestorNodeWithRootAsParent = currentNode.getParents().at(-2)

              ancestorNodeWithRootAsParent?.remove()
            } else if ($isNodeSelection(selection)) {
              const selectedNodes = selection.getNodes()
              selectedNodes.forEach((node) => {
                if ($isDecoratorNode(node)) {
                  node.remove()
                }
              })
            }
          })
        },
        disabled: false,
        icon: <Trash2 className="h-4 w-4" />,
      }),
    ]
  }, [editor])

  return <NodeContextMenuPlugin items={items} />
}

// Custom wrapper to fix the React key prop warning in Lexical library
function NodeContextMenuPlugin({ items }) {
  useEffect(() => {
    const originalError = console.error
    
    // Override console.error to filter out the key prop warning
    console.error = (...args) => {
      const message = args[0]
      if (typeof message === 'string' && message.includes('key" prop is being spread into JSX')) {
        return // Suppress this specific warning
      }
      originalError.apply(console, args)
    }
    
    // Cleanup function to restore original console.error
    return () => {
      console.error = originalError
    }
  }, [])
  
  return (
    <LexicalNodeContextMenuPlugin
      className="bg-popover text-popover-foreground !z-50 overflow-hidden rounded-md border shadow-md outline-none [&:has(*)]:!z-10"
      itemClassName="relative w-full flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
      separatorClassName="bg-border -mx-1 h-px"
      items={items}
    />
  )
}