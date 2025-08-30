"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin"
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
} from "lexical"
import { createPortal } from "react-dom"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

class EmojiOption extends MenuOption {
  constructor(title, emoji, options = {}) {
    super(title)
    this.title = title
    this.emoji = emoji
    this.keywords = options.keywords || []
  }
}

const MAX_EMOJI_SUGGESTION_COUNT = 10

// Simple emoji list for now
const defaultEmojis = [
  { emoji: "😀", aliases: ["grinning"], tags: ["smile", "happy"] },
  { emoji: "😃", aliases: ["smiley"], tags: ["smile", "happy"] },
  { emoji: "😄", aliases: ["smile"], tags: ["happy", "joy"] },
  { emoji: "😁", aliases: ["grin"], tags: ["smile", "happy"] },
  { emoji: "😆", aliases: ["laughing"], tags: ["happy", "laugh"] },
  { emoji: "😅", aliases: ["sweat_smile"], tags: ["happy", "laugh"] },
  { emoji: "🤣", aliases: ["rofl"], tags: ["laugh", "funny"] },
  { emoji: "😂", aliases: ["joy"], tags: ["laugh", "tears"] },
  { emoji: "🙂", aliases: ["slightly_smiling_face"], tags: ["smile"] },
  { emoji: "🙃", aliases: ["upside_down_face"], tags: ["silly"] },
  { emoji: "😉", aliases: ["wink"], tags: ["flirt"] },
  { emoji: "😊", aliases: ["blush"], tags: ["smile", "happy"] },
  { emoji: "😇", aliases: ["innocent"], tags: ["angel"] },
  { emoji: "🥰", aliases: ["smiling_face_with_hearts"], tags: ["love"] },
  { emoji: "😍", aliases: ["heart_eyes"], tags: ["love", "crush"] },
  { emoji: "🤩", aliases: ["star_struck"], tags: ["eyes", "star"] },
  { emoji: "😘", aliases: ["kissing_heart"], tags: ["love", "kiss"] },
  { emoji: "😗", aliases: ["kissing"], tags: ["kiss"] },
  { emoji: "😚", aliases: ["kissing_closed_eyes"], tags: ["kiss"] },
  { emoji: "😙", aliases: ["kissing_smiling_eyes"], tags: ["kiss"] },
  { emoji: "🥲", aliases: ["smiling_face_with_tear"], tags: ["grateful"] },
  { emoji: "😋", aliases: ["yum"], tags: ["tongue", "lick"] },
  { emoji: "😛", aliases: ["stuck_out_tongue"], tags: ["tongue"] },
  { emoji: "😜", aliases: ["stuck_out_tongue_winking_eye"], tags: ["tongue", "wink"] },
  { emoji: "🤪", aliases: ["zany_face"], tags: ["goofy", "wacky"] },
  { emoji: "😝", aliases: ["stuck_out_tongue_closed_eyes"], tags: ["tongue"] },
  { emoji: "🤑", aliases: ["money_mouth_face"], tags: ["rich", "money"] },
  { emoji: "🤗", aliases: ["hugs"], tags: ["hug"] },
  { emoji: "🤭", aliases: ["hand_over_mouth"], tags: ["quiet", "hush"] },
  { emoji: "🤫", aliases: ["shushing_face"], tags: ["quiet", "shush"] },
  { emoji: "🤔", aliases: ["thinking"], tags: ["hmm", "think"] },
  { emoji: "🤐", aliases: ["zipper_mouth_face"], tags: ["silence", "hush"] },
  { emoji: "🤨", aliases: ["raised_eyebrow"], tags: ["suspicious"] },
  { emoji: "😐", aliases: ["neutral_face"], tags: ["meh"] },
  { emoji: "😑", aliases: ["expressionless"], tags: ["blank"] },
  { emoji: "😶", aliases: ["no_mouth"], tags: ["mute", "silence"] },
  { emoji: "😏", aliases: ["smirk"], tags: ["smug"] },
  { emoji: "😒", aliases: ["unamused"], tags: ["meh"] },
  { emoji: "🙄", aliases: ["roll_eyes"], tags: ["eyeroll"] },
  { emoji: "😬", aliases: ["grimacing"], tags: ["grimace"] },
  { emoji: "🤥", aliases: ["lying_face"], tags: ["liar"] },
  { emoji: "😔", aliases: ["pensive"], tags: ["sad"] },
  { emoji: "😕", aliases: ["confused"], tags: ["sad"] },
  { emoji: "🙁", aliases: ["slightly_frowning_face"], tags: ["sad"] },
  { emoji: "☹️", aliases: ["frowning_face"], tags: ["sad"] },
  { emoji: "😣", aliases: ["persevere"], tags: ["struggling"] },
  { emoji: "😖", aliases: ["confounded"], tags: ["sad"] },
  { emoji: "😫", aliases: ["tired_face"], tags: ["upset", "whine"] },
  { emoji: "😩", aliases: ["weary"], tags: ["tired"] },
  { emoji: "🥺", aliases: ["pleading_face"], tags: ["puppy", "eyes"] },
  { emoji: "😢", aliases: ["cry"], tags: ["sad", "tear"] },
  { emoji: "😭", aliases: ["sob"], tags: ["sad", "cry"] },
  { emoji: "😤", aliases: ["triumph"], tags: ["smug"] },
  { emoji: "😠", aliases: ["angry"], tags: ["mad", "annoyed"] },
  { emoji: "😡", aliases: ["rage"], tags: ["angry"] },
  { emoji: "🤬", aliases: ["cursing_face"], tags: ["foul"] },
  { emoji: "🤯", aliases: ["exploding_head"], tags: ["mind", "blown"] },
  { emoji: "😳", aliases: ["flushed"], tags: ["blush"] },
  { emoji: "🥵", aliases: ["hot_face"], tags: ["heat"] },
  { emoji: "🥶", aliases: ["cold_face"], tags: ["freezing"] },
  { emoji: "😱", aliases: ["scream"], tags: ["horror", "shocked"] },
  { emoji: "😨", aliases: ["fearful"], tags: ["scared"] },
  { emoji: "😰", aliases: ["cold_sweat"], tags: ["nervous"] },
  { emoji: "😥", aliases: ["disappointed_relieved"], tags: ["phew", "sweat"] },
  { emoji: "😓", aliases: ["sweat"], tags: ["hot"] },
  { emoji: "🤗", aliases: ["hugging"], tags: ["hug"] },
  { emoji: "🤔", aliases: ["thinking"], tags: ["hmm"] },
  { emoji: "🤭", aliases: ["hand_over_mouth"], tags: ["quiet"] },
  { emoji: "🤫", aliases: ["shushing"], tags: ["quiet"] },
  { emoji: "🤥", aliases: ["lying"], tags: ["liar"] },
  { emoji: "😶‍🌫️", aliases: ["face_in_clouds"], tags: ["foggy"] },
  { emoji: "😵‍💫", aliases: ["face_with_spiral_eyes"], tags: ["dizzy"] },
  { emoji: "😮‍💨", aliases: ["face_exhaling"], tags: ["sigh"] },
  { emoji: "😵", aliases: ["dizzy_face"], tags: ["spent", "unconscious"] },
  { emoji: "🤐", aliases: ["zipper_mouth"], tags: ["silence"] },
  { emoji: "🥴", aliases: ["woozy_face"], tags: ["dizzy", "intoxicated"] },
  { emoji: "🤢", aliases: ["nauseated_face"], tags: ["sick", "barf"] },
  { emoji: "🤮", aliases: ["vomiting_face"], tags: ["barf", "sick"] },
  { emoji: "🤧", aliases: ["sneezing_face"], tags: ["achoo", "sick"] },
  { emoji: "😷", aliases: ["mask"], tags: ["sick", "ill"] },
  { emoji: "🤒", aliases: ["face_with_thermometer"], tags: ["sick"] },
  { emoji: "🤕", aliases: ["face_with_head_bandage"], tags: ["hurt"] },
  { emoji: "🤠", aliases: ["cowboy"], tags: ["hat"] },
  { emoji: "😎", aliases: ["sunglasses"], tags: ["cool"] },
  { emoji: "🤓", aliases: ["nerd"], tags: ["geek", "glasses"] },
  { emoji: "🧐", aliases: ["monocle"], tags: ["stuffy"] },
  { emoji: "😕", aliases: ["confused"], tags: ["indifference"] },
  { emoji: "😟", aliases: ["worried"], tags: ["concern"] },
  { emoji: "🙁", aliases: ["slightly_frowning"], tags: ["disappointed"] },
  { emoji: "☹️", aliases: ["frowning"], tags: ["sad"] },
  { emoji: "😮", aliases: ["open_mouth"], tags: ["surprise", "impressed"] },
  { emoji: "😯", aliases: ["hushed"], tags: ["silence", "speechless"] },
  { emoji: "😲", aliases: ["astonished"], tags: ["amazed", "gasp"] },
  { emoji: "😴", aliases: ["sleeping"], tags: ["zzz"] },
  { emoji: "🤤", aliases: ["drooling"], tags: ["drool"] },
  { emoji: "😪", aliases: ["sleepy"], tags: ["tired"] },
  { emoji: "😵", aliases: ["dizzy"], tags: ["spent", "unconscious"] },
  { emoji: "🤐", aliases: ["zipper_mouth"], tags: ["silence", "hush"] },
  { emoji: "🥴", aliases: ["woozy"], tags: ["dizzy", "intoxicated"] },
  { emoji: "🤢", aliases: ["nauseated"], tags: ["sick", "barf"] },
  { emoji: "🤮", aliases: ["vomiting"], tags: ["barf", "sick"] },
  { emoji: "🤧", aliases: ["sneezing"], tags: ["achoo", "sick"] },
  { emoji: "😷", aliases: ["mask"], tags: ["sick", "ill"] },
  { emoji: "🤒", aliases: ["thermometer"], tags: ["sick"] },
  { emoji: "🤕", aliases: ["head_bandage"], tags: ["hurt"] }
]

export function EmojiPickerPlugin() {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = useState(null)
  const [emojis, setEmojis] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setEmojis(defaultEmojis)
  }, [])

  const emojiOptions = useMemo(
    () =>
      emojis != null
        ? emojis.map(
            ({ emoji, aliases, tags }) =>
              new EmojiOption(aliases[0], emoji, {
                keywords: [...aliases, ...tags],
              })
          )
        : [],
    [emojis]
  )

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch(":", {
    minLength: 0,
  })

  const options = useMemo(() => {
    return emojiOptions
      .filter((option) => {
        return queryString != null
          ? new RegExp(queryString, "gi").exec(option.title) ||
            option.keywords != null
            ? option.keywords.some((keyword) =>
                new RegExp(queryString, "gi").exec(keyword)
              )
            : false
          : emojiOptions
      })
      .slice(0, MAX_EMOJI_SUGGESTION_COUNT)
  }, [emojiOptions, queryString])

  const onSelectOption = useCallback(
    (selectedOption, nodeToRemove, closeMenu) => {
      editor.update(() => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection) || selectedOption == null) {
          return
        }

        if (nodeToRemove) {
          nodeToRemove.remove()
        }

        selection.insertNodes([$createTextNode(selectedOption.emoji)])

        closeMenu()
      })
    },
    [editor]
  )

  // Simple implementation without dynamic import
  return null
}