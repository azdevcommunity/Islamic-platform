"use client"

import * as React from "react"
import { HexColorPicker } from "react-colorful"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function ColorPicker({
  disabled = false,
  stopCloseOnClickSelf = true,
  color,
  onChange,
  icon,
  label,
  title,
  ...rest
}) {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          size="sm"
          className="h-8 w-8 p-0"
          variant="outline"
          title={title}
          {...rest}
        >
          <span className="h-4 w-4 rounded-full flex items-center justify-center">
            {icon}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="space-y-2">
          <HexColorPicker
            color={color}
            onChange={(color) => onChange?.(color, false)}
            style={{ width: '100%', height: '120px' }}
          />
          <Input
            maxLength={7}
            onChange={(e) => {
              e.stopPropagation()
              onChange?.(e?.currentTarget?.value, false)
            }}
            value={color}
            placeholder="#000000"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Export both as default and named export for compatibility
export default ColorPicker
export { ColorPicker }