"use client"

import { useCallback, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLexicalTextEntity } from "@lexical/react/useLexicalTextEntity"

import {
  $createKeywordNode,
  KeywordNode,
} from "@/components/ui/lexical/nodes/keyword-node"

// Simplified regex for keywords - just match basic congratulations words
const KEYWORDS_REGEX = /(^|\s)(congrats|congratulations|awesome|great|excellent|amazing|fantastic|wonderful)(\s|$)/i

export function KeywordsPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([KeywordNode])) {
      throw new Error("KeywordsPlugin: KeywordNode not registered on editor")
    }
  }, [editor])

  const $createKeywordNode_ = useCallback((textNode) => {
    return $createKeywordNode(textNode.getTextContent())
  }, [])

  const getKeywordMatch = useCallback((text) => {
    const matchArr = KEYWORDS_REGEX.exec(text)

    if (matchArr === null) {
      return null
    }

    const hashtagLength = matchArr[2].length
    const startOffset = matchArr.index + matchArr[1].length
    const endOffset = startOffset + hashtagLength
    return {
      end: endOffset,
      start: startOffset,
    }
  }, [])

  useLexicalTextEntity(getKeywordMatch, KeywordNode, $createKeywordNode_)

  return null
}