/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical"
import { $createPollNode } from "../nodes/poll-node"

export const INSERT_POLL_COMMAND = "INSERT_POLL_COMMAND"

export function PollPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_POLL_COMMAND,
      (payload) => {
        const { question, options } = payload || {}
        const pollNode = $createPollNode(question, options)
        $insertNodes([pollNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

// Simple InsertPollDialog component
export function InsertPollDialog({ activeEditor, onClose }) {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["Option 1", "Option 2"])

  const handleInsert = () => {
    if (question && options.length >= 2) {
      activeEditor.dispatchCommand(INSERT_POLL_COMMAND, {
        question,
        options,
      })
      onClose()
    }
  }

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`])
  }

  const updateOption = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <label htmlFor="poll-question">Poll Question</label>
        <input
          id="poll-question"
          type="text"
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="grid gap-2">
        <label>Poll Options</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            className="p-2 border rounded"
          />
        ))}
        <button
          onClick={addOption}
          className="p-2 border border-dashed rounded hover:bg-gray-50"
        >
          Add Option
        </button>
      </div>
      <button
        onClick={handleInsert}
        disabled={!question || options.length < 2}
        className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Insert Poll
      </button>
    </div>
  )
}