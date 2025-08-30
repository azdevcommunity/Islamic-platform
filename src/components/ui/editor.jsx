'use client'

import { LexicalEditor } from './lexical-editor'

// Simple wrapper for backward compatibility
export function Editor(props) {
  return <LexicalEditor {...props} />
}

export function EditorContainer({ children, className, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function EditorView(props) {
  return <LexicalEditor {...props} />
}
