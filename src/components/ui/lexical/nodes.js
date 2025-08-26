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

// Import custom nodes
import { EmojiNode } from "./nodes/emoji-node"
import { ImageNode } from "./nodes/image-node"
import { MentionNode } from "./nodes/mention-node"
import { EquationNode } from "./nodes/equation-node"
import { ExcalidrawNode } from "./nodes/excalidraw-node"
import { PollNode } from "./nodes/poll-node"
import { PageBreakNode } from "./nodes/page-break-node"
import { KeywordNode } from "./nodes/keyword-node"
import { InlineImageNode } from "./nodes/inline-image-node"
import { CollapsibleContainerNode } from "./nodes/collapsible-container-node"
import { CollapsibleContentNode } from "./nodes/collapsible-content-node"
import { CollapsibleTitleNode } from "./nodes/collapsible-title-node"
import { LayoutContainerNode } from "./nodes/layout-container-node"
import { LayoutItemNode } from "./nodes/layout-item-node"
import { AutocompleteNode } from "./nodes/autocomplete-node"

// Tüm node'lar - shadcn-editor-main ile aynı fonksiyonalite
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
  AutoLinkNode,
  // Custom nodes
  EmojiNode,
  ImageNode,
  MentionNode,
  EquationNode,
  ExcalidrawNode,
  PollNode,
  PageBreakNode,
  KeywordNode,
  InlineImageNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
  LayoutContainerNode,
  LayoutItemNode,
  AutocompleteNode,
]