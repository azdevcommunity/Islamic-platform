"use client"

import { createContext, useContext, useState } from "react"

const Context = createContext({
  isLinkEditMode: false,
  setIsLinkEditMode: () => {},
})

export function FloatingLinkContext({ children }) {
  const [isLinkEditMode, setIsLinkEditMode] = useState(false)

  return (
    <Context.Provider value={{ isLinkEditMode, setIsLinkEditMode }}>
      {children}
    </Context.Provider>
  )
}

export function useFloatingLinkContext() {
  if (!Context) {
    throw new Error(
      "useFloatingLinkContext must be used within a FloatingLinkContext"
    )
  }
  return useContext(Context)
}