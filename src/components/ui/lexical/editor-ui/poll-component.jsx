/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getNodeByKey } from "lexical"

export default function PollComponent({ question, options, nodeKey }) {
  const [editor] = useLexicalComposerContext()
  const [isEditing, setIsEditing] = useState(!question)
  const [pollQuestion, setPollQuestion] = useState(question || "")
  const [pollOptions, setPollOptions] = useState(options || ["", ""])

  const handleSave = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if (node) {
        node.setQuestion(pollQuestion)
        node.setOptions(pollOptions.filter(option => option.trim()))
      }
    })
    setIsEditing(false)
  }

  const addOption = () => {
    setPollOptions([...pollOptions, ""])
  }

  const updateOption = (index, value) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const removeOption = (index) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index)
      setPollOptions(newOptions)
    }
  }

  if (isEditing) {
    return (
      <div className="poll-editor">
        <div className="poll-question-input">
          <input
            type="text"
            placeholder="Enter your question..."
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />
        </div>
        <div className="poll-options">
          {pollOptions.map((option, index) => (
            <div key={index} className="poll-option-input">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
              />
              {pollOptions.length > 2 && (
                <button onClick={() => removeOption(index)}>×</button>
              )}
            </div>
          ))}
        </div>
        <div className="poll-actions">
          <button onClick={addOption}>Add Option</button>
          <button onClick={handleSave}>Save Poll</button>
        </div>
      </div>
    )
  }

  return (
    <div className="poll-container" onClick={() => setIsEditing(true)}>
      <div className="poll-question">
        <h4>{question || "Click to create poll"}</h4>
      </div>
      {options && options.length > 0 && (
        <div className="poll-options">
          {options.map((option, index) => (
            <div key={index} className="poll-option">
              <input type="radio" name={`poll-${nodeKey}`} disabled />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}