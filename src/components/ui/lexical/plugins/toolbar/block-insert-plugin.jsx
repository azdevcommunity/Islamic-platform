"use client"

import { PlusIcon } from "lucide-react"

import { useModal } from "@/components/ui/lexical/hooks/use-modal"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@/components/ui/select"

export function BlockInsertPlugin({ children }) {
  const [modal] = useModal()

  return (
    <>
      {modal}
      <Select value={""}>
        <SelectTrigger className="!h-8 w-min gap-1">
          <PlusIcon className="size-4" />
          <span>Insert</span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}