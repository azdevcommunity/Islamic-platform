"use client"

import { useCallback, useState } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { Smile } from "lucide-react"

import { useToolbarContext } from "../../context/toolbar-context"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const EMOJI_LIST = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
  "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
  "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
  "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
  "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯",
  "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐",
  "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈",
  "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾",
  "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿",
  "😾", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤏", "✌️", "🤞",
  "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍",
  "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝",
  "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂",
  "🦻", "👃", "🧠", "🦷", "🦴", "👀", "👁️", "👅", "👄", "💋"
]

export function EmojiPickerToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [isOpen, setIsOpen] = useState(false)

  const insertEmoji = useCallback((emoji) => {
    activeEditor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        selection.insertText(emoji)
      }
    })
    setIsOpen(false)
  }, [activeEditor])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          title="Emoji ekle"
          className="h-8 w-8 p-0"
        >
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        <div className="grid grid-cols-10 gap-1 max-h-60 overflow-y-auto">
          {EMOJI_LIST.map((emoji, index) => (
            <button
              key={index}
              onClick={() => insertEmoji(emoji)}
              className="w-8 h-8 text-lg hover:bg-muted rounded flex items-center justify-center"
              title={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}