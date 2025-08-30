"use client"

import { useState } from "react"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { 
  Image, 
  Table, 
  Minus, 
  List, 
  ListOrdered,
  Plus
} from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import { INSERT_IMAGE_COMMAND } from "../image-plugin"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

export function BlockInsertToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [isTablePopoverOpen, setIsTablePopoverOpen] = useState(false)
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const insertHorizontalRule = () => {
    activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
  }

  const insertBulletList = () => {
    activeEditor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }

  const insertNumberedList = () => {
    activeEditor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  }

  const insertTable = (rows = 2, columns = 2) => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, { rows, columns })
    setIsTablePopoverOpen(false)
  }

  const insertImageFromFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const src = e.target.result
          activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src,
            alt: file.name || "Uploaded image"
          })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
    setIsImagePopoverOpen(false)
  }

  const insertImageFromUrl = () => {
    if (imageUrl) {
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: imageUrl,
        alt: "Image from URL"
      })
      setImageUrl("")
      setIsImagePopoverOpen(false)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={insertHorizontalRule}
        title="Yatay çizgi ekle"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={insertBulletList}
        title="Madde işaretli liste"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={insertNumberedList}
        title="Numaralı liste"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Popover open={isTablePopoverOpen} onOpenChange={setIsTablePopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            title="Tablo ekle"
          >
            <Table className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="space-y-2">
            <p className="text-sm font-medium">Tablo Boyutu</p>
            <div className="grid grid-cols-3 gap-2">
              <Button size="sm" onClick={() => insertTable(2, 2)}>2x2</Button>
              <Button size="sm" onClick={() => insertTable(3, 3)}>3x3</Button>
              <Button size="sm" onClick={() => insertTable(4, 4)}>4x4</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover open={isImagePopoverOpen} onOpenChange={setIsImagePopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            title="Görsel ekle"
          >
            <Image className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Dosyadan Görsel Seç</label>
              <Button 
                onClick={insertImageFromFile} 
                size="sm" 
                className="w-full"
                variant="outline"
              >
                📁 Dosya Seç
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">veya</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">URL'den Görsel Ekle</label>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mb-2"
              />
              <Button 
                onClick={insertImageFromUrl} 
                size="sm" 
                className="w-full"
                disabled={!imageUrl}
              >
                🔗 URL'den Ekle
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}