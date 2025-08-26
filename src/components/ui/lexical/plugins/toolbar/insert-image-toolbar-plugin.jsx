"use client"

import { useCallback } from "react"
import { $createParagraphNode, $insertNodes, $isRootOrShadowRoot } from "lexical"
import { $wrapNodeInElement } from "@lexical/utils"
import { Image } from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import { Button } from "@/components/ui/button"
import { $createImageNode } from "../../nodes/image-node"

export function InsertImageToolbarPlugin() {
  const { activeEditor } = useToolbarContext()

  const insertImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const imageDataUrl = reader.result
          
          activeEditor.update(() => {
            const imageNode = $createImageNode({
              altText: file.name,
              height: 'inherit',
              maxWidth: 500,
              src: imageDataUrl,
              width: 'inherit',
            })
            
            $insertNodes([imageNode])
            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
              $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
            }
          })
        }
        reader.readAsDataURL(file)
      }
    }
    
    input.click()
  }, [activeEditor])

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={insertImage}
      title="Görsel ekle"
      className="h-8 w-8 p-0"
    >
      <Image className="h-4 w-4" />
    </Button>
  )
}