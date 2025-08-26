/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useCallback, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getNodeByKey } from "lexical"

export default function EquationComponent({ equation, inline, nodeKey }) {
  const [editor] = useLexicalComposerContext()
  const [equationValue, setEquationValue] = useState(equation)
  const [showEquationEditor, setShowEquationEditor] = useState(false)
  const inputRef = useRef(null)

  const onHide = useCallback(
    (restoreSelection) => {
      setShowEquationEditor(false)
      editor.update(() => {
        const node = $getNodeByKey(nodeKey)
        if (node) {
          node.setEquation(equationValue)
        }
      })
    },
    [editor, equationValue, nodeKey]
  )

  const onShow = useCallback(() => {
    setShowEquationEditor(true)
  }, [])

  useEffect(() => {
    if (showEquationEditor && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showEquationEditor])

  if (showEquationEditor) {
    return (
      <div className="equation-editor">
        <input
          ref={inputRef}
          className="equation-input"
          value={equationValue}
          onChange={(event) => {
            setEquationValue(event.target.value)
          }}
          onBlur={() => onHide(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              onHide(true)
            }
            if (event.key === "Escape") {
              event.preventDefault()
              onHide(false)
            }
          }}
        />
      </div>
    )
  }

  return (
    <span
      className={`equation ${inline ? "equation-inline" : "equation-block"}`}
      onClick={onShow}
    >
      {equation || "Enter equation..."}
    </span>
  )
}

// React import for useEffect
import { useEffect } from "react"