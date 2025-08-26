import { useState } from "react"
import { $isCodeNode } from "@lexical/code"
import { $getNearestNodeFromDOMNode } from "lexical"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyButton({ editor, getCodeDOMNode }) {
  const [isCopyCompleted, setCopyCompleted] = useState(false)

  const handleCopyCode = async () => {
    const codeDOMNode = getCodeDOMNode()

    if (!codeDOMNode) {
      return
    }

    let content = ""

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode)

      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent()
      }

      const selection = codeNode?.select()
    })

    try {
      await navigator.clipboard.writeText(content)
      setCopyCompleted(true)

      setTimeout(() => {
        setCopyCompleted(false)
      }, 1000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0"
      onClick={handleCopyCode}
      aria-label="Copy code to clipboard"
    >
      {isCopyCompleted ? (
        <Check className="h-3 w-3" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </Button>
  )
}