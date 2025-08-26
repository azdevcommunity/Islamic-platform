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
import { $createAutocompleteNode } from "../nodes/autocomplete-node"

export const INSERT_AUTOCOMPLETE_COMMAND = "INSERT_AUTOCOMPLETE_COMMAND"

export function AutocompletePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_AUTOCOMPLETE_COMMAND,
      (payload) => {
        const { uuid } = payload || { uuid: Math.random().toString(36) }
        const autocompleteNode = $createAutocompleteNode(uuid)
        $insertNodes([autocompleteNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}