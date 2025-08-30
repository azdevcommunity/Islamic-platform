"use client"

import { useEffect } from "react"

const validInputTypes = new Set([
  "insertText",
  "insertCompositionText",
  "insertFromComposition",
  "insertLineBreak",
  "insertParagraph",
  "deleteCompositionText",
  "deleteContentBackward",
  "deleteByComposition",
  "deleteContent",
  "deleteContentForward",
  "deleteWordBackward",
  "deleteWordForward",
  "deleteHardLineBackward",
  "deleteSoftLineBackward",
  "deleteHardLineForward",
  "deleteSoftLineForward",
])

export function TypingPerfPlugin() {
  useEffect(() => {
    let start = 0
    let timerId = null
    let keyPressTimerId = null
    let log = []
    let invalidatingEvent = false

    const measureEventEnd = function logKeyPress() {
      if (keyPressTimerId != null) {
        if (invalidatingEvent) {
          invalidatingEvent = false
        } else {
          log.push(performance.now() - start)
        }

        clearTimeout(keyPressTimerId)
        keyPressTimerId = null
      }
    }

    const measureEventStart = function measureEvent() {
      if (timerId != null) {
        clearTimeout(timerId)
        timerId = null
      }

      // We use a setTimeout(0) instead of requestAnimationFrame, due to
      // inconsistencies between the sequencing of rAF in different browsers.
      keyPressTimerId = setTimeout(measureEventEnd, 0)
      // Schedule a timer to report the results.
      timerId = setTimeout(() => {
        const total = log.reduce((a, b) => a + b, 0)
        const reportedText =
          "Typing Perf: " + Math.round((total / log.length) * 100) / 100 + "ms"
        console.log(reportedText)
        log = []
      }, 2000)
      // Make the time after we do the previous logic, so we don't measure the overhead
      // for it all.
      start = performance.now()
    }

    const beforeInputHandler = function beforeInputHandler(event) {
      if (!validInputTypes.has(event.inputType) || invalidatingEvent) {
        invalidatingEvent = false
        return
      }

      measureEventStart()
    }

    const keyDownHandler = function keyDownHandler(event) {
      const key = event.key

      if (key === "Backspace" || key === "Enter") {
        measureEventStart()
      }
    }

    const pasteHandler = function pasteHandler() {
      invalidatingEvent = true
    }

    const cutHandler = function cutHandler() {
      invalidatingEvent = true
    }

    window.addEventListener("keydown", keyDownHandler, true)
    window.addEventListener("selectionchange", measureEventEnd, true)
    window.addEventListener("beforeinput", beforeInputHandler, true)
    window.addEventListener("paste", pasteHandler, true)
    window.addEventListener("cut", cutHandler, true)

    return () => {
      window.removeEventListener("keydown", keyDownHandler, true)
      window.removeEventListener("selectionchange", measureEventEnd, true)
      window.removeEventListener("beforeinput", beforeInputHandler, true)
      window.removeEventListener("paste", pasteHandler, true)
      window.removeEventListener("cut", cutHandler, true)
    }
  }, [])

  return null
}