/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical"
import { $createLinkNode } from "@lexical/link"
import { $createTextNode } from "lexical"

export const INSERT_LINK_COMMAND = "INSERT_LINK_COMMAND"

export function LinkPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_LINK_COMMAND,
      (payload) => {
        const { url, text } = payload
        const linkNode = $createLinkNode(url)
        linkNode.append($createTextNode(text || url))
        $insertNodes([linkNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}