"use client"

import { useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import { MicIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const SPEECH_TO_TEXT_COMMAND = createCommand("SPEECH_TO_TEXT_COMMAND")

const CAN_USE_DOM = typeof window !== "undefined"

const VOICE_COMMANDS = {
  "\n": ({ selection }) => {
    selection.insertParagraph()
  },
  redo: ({ editor }) => {
    editor.dispatchCommand(REDO_COMMAND, undefined)
  },
  undo: ({ editor }) => {
    editor.dispatchCommand(UNDO_COMMAND, undefined)
  },
}

function SpeechToTextPluginImpl() {
  // All hooks must be called before any conditional returns
  const [editor] = useLexicalComposerContext()
  const [supportsSpeech, setSupportsSpeech] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isSpeechToText, setIsSpeechToText] = useState(false)
  const recognition = useRef(null)
  
  const SpeechRecognition =
    CAN_USE_DOM && (window.SpeechRecognition || window.webkitSpeechRecognition)
  
  useEffect(() => {
    setSupportsSpeech(
      CAN_USE_DOM &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    )
  }, [])

  useEffect(() => {
    if (isEnabled && recognition.current === null) {
      recognition.current = new SpeechRecognition()
      recognition.current.continuous = true
      recognition.current.interimResults = true
      recognition.current.addEventListener("result", (event) => {
        const resultItem = event.results.item(event.resultIndex)
        const { transcript } = resultItem.item(0)

        if (!resultItem.isFinal) {
          return
        }

        editor.update(() => {
          const selection = $getSelection()

          if ($isRangeSelection(selection)) {
            const command = VOICE_COMMANDS[transcript.toLowerCase().trim()]

            if (command) {
              command({
                editor,
                selection,
              })
            } else if (transcript.match(/\s*\n\s*/)) {
              selection.insertParagraph()
            } else {
              selection.insertText(transcript)
            }
          }
        })
      })
    }

    if (recognition.current) {
      if (isEnabled) {
        recognition.current.start()
      } else {
        recognition.current.stop()
      }
    }

    return () => {
      if (recognition.current !== null) {
        recognition.current.stop()
      }
    }
  }, [SpeechRecognition, editor, isEnabled])

  useEffect(() => {
    return editor.registerCommand(
      SPEECH_TO_TEXT_COMMAND,
      (_isEnabled) => {
        setIsEnabled(_isEnabled)
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])
  
  // Don't render anything if speech recognition is not supported
  if (!supportsSpeech) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText)
            setIsSpeechToText(!isSpeechToText)
          }}
          variant={isSpeechToText ? "secondary" : "ghost"}
          title="Speech To Text"
          aria-label={`${isSpeechToText ? "Enable" : "Disable"} speech to text`}
          className="p-2"
          size={"sm"}
        >
          <MicIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Speech To Text</TooltipContent>
    </Tooltip>
  )
}

export const SpeechToTextPlugin = SpeechToTextPluginImpl