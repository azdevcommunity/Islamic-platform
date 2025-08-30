"use client"

import { $isListNode, ListNode } from "@lexical/list"
import { $isHeadingNode } from "@lexical/rich-text"
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils"
import { $isRangeSelection, $isRootOrShadowRoot } from "lexical"

import { useToolbarContext } from "../../context/toolbar-context"
import { Select, SelectContent, SelectGroup, SelectTrigger } from "@/components/ui/select"
import {
  Text,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Code,
} from "lucide-react"

const blockTypeToBlockName = {
  paragraph: { label: "Normal", icon: <Text className="h-4 w-4" /> },
  h1: { label: "Başlık 1", icon: <Heading1 className="h-4 w-4" /> },
  h2: { label: "Başlık 2", icon: <Heading2 className="h-4 w-4" /> },
  h3: { label: "Başlık 3", icon: <Heading3 className="h-4 w-4" /> },
  number: { label: "Numaralı Liste", icon: <ListOrdered className="h-4 w-4" /> },
  bullet: { label: "Madde İşaretli", icon: <List className="h-4 w-4" /> },
  check: { label: "Kontrol Listesi", icon: <ListTodo className="h-4 w-4" /> },
  code: { label: "Kod Bloğu", icon: <Code className="h-4 w-4" /> },
  quote: { label: "Alıntı", icon: <Quote className="h-4 w-4" /> },
}

export function BlockFormatDropDown({ children }) {
  const { activeEditor, blockType, setBlockType } = useToolbarContext()

  return (
    <Select
      value={blockType}
      onValueChange={(value) => {
        setBlockType(value)
      }}
    >
      <SelectTrigger className="!h-8 w-min gap-1">
        {blockTypeToBlockName[blockType]?.icon}
        <span>{blockTypeToBlockName[blockType]?.label}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>
  )
}