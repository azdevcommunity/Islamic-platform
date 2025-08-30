import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { HashtagNode } from "@lexical/hashtag"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { OverflowNode } from "@lexical/overflow"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import {
  ParagraphNode,
  TextNode,
} from "lexical"

import { AutocompleteNode } from "@/components/ui/lexical/nodes/autocomplete-node"
import { CollapsibleContainerNode } from "@/components/ui/lexical/nodes/collapsible-container-node"
import { CollapsibleContentNode } from "@/components/ui/lexical/nodes/collapsible-content-node"
import { CollapsibleTitleNode } from "@/components/ui/lexical/nodes/collapsible-title-node"
import { EmojiNode } from "@/components/ui/lexical/nodes/emoji-node"
import { EquationNode } from "@/components/ui/lexical/nodes/equation-node"
import { ExcalidrawNode } from "@/components/ui/lexical/nodes/excalidraw-node"
import { ImageNode } from "@/components/ui/lexical/nodes/image-node"
import { InlineImageNode } from "@/components/ui/lexical/nodes/inline-image-node"
import { KeywordNode } from "@/components/ui/lexical/nodes/keyword-node"
import { LayoutContainerNode } from "@/components/ui/lexical/nodes/layout-container-node"
import { LayoutItemNode } from "@/components/ui/lexical/nodes/layout-item-node"
import { MentionNode } from "@/components/ui/lexical/nodes/mention-node"
import { PageBreakNode } from "@/components/ui/lexical/nodes/page-break-node"
import { PollNode } from "@/components/ui/lexical/nodes/poll-node"

export const nodes = [
  HeadingNode,
  ParagraphNode,
  TextNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  OverflowNode,
  HashtagNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  CodeNode,
  CodeHighlightNode,
  HorizontalRuleNode,
  MentionNode,
  PageBreakNode,
  ImageNode,
  InlineImageNode,
  EmojiNode,
  KeywordNode,
  ExcalidrawNode,
  PollNode,
  LayoutContainerNode,
  LayoutItemNode,
  EquationNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
  AutoLinkNode,
  AutocompleteNode,
]