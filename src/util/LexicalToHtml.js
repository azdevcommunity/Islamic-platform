/**
 * Convert Lexical JSON to HTML
 * This utility converts Lexical editor state to HTML for rendering
 */

export function lexicalToHtml(lexicalJson) {
  if (!lexicalJson) return ''
  
  try {
    // If it's already HTML (backward compatibility)
    if (typeof lexicalJson === 'string' && lexicalJson.includes('<')) {
      return lexicalJson
    }
    
    // Parse JSON if it's a string
    const lexicalState = typeof lexicalJson === 'string' 
      ? JSON.parse(lexicalJson) 
      : lexicalJson
    
    if (!lexicalState.root || !lexicalState.root.children) {
      return ''
    }
    
    return convertNodesToHtml(lexicalState.root.children)
  } catch (error) {
    console.error('Error converting Lexical to HTML:', error)
    return ''
  }
}

function convertNodesToHtml(nodes) {
  return nodes.map(node => convertNodeToHtml(node)).join('')
}

function convertNodeToHtml(node) {
  if (!node) return ''
  
  switch (node.type) {
    case 'paragraph':
      return `<p class="leading-7 [&:not(:first-child)]:mt-6" dir="${node.direction || 'ltr'}">${convertChildrenToHtml(node.children)}</p>`
    
    case 'heading':
      const tag = node.tag || 'h1'
      const headingClasses = {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
        h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
        h6: 'scroll-m-20 text-base font-semibold tracking-tight'
      }
      return `<${tag} class="${headingClasses[tag] || headingClasses.h3}" dir="${node.direction || 'ltr'}">${convertChildrenToHtml(node.children)}</${tag}>`
    
    case 'quote':
      return `<blockquote class="mt-6 border-l-2 pl-6 italic" dir="${node.direction || 'ltr'}">${convertChildrenToHtml(node.children)}</blockquote>`
    
    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      const listClass = node.listType === 'number' 
        ? 'm-0 p-0 list-decimal [&>li]:mt-2 list-outside !list-decimal'
        : 'm-0 p-0 list-outside [&>li]:mt-2 !list-disc'
      return `<${listTag} class="${listClass}">${convertChildrenToHtml(node.children)}</${listTag}>`
    
    case 'listitem':
      return `<li value="${node.value || 1}" class="mx-8" dir="${node.direction || 'ltr'}">${convertChildrenToHtml(node.children)}</li>`
    
    case 'text':
      return convertTextNodeToHtml(node)
    
    case 'link':
      return `<a href="${node.url}" class="text-blue-600 hover:text-blue-800 underline" target="${node.target || '_self'}">${convertChildrenToHtml(node.children)}</a>`
    
    case 'linebreak':
      return '<br>'
    
    default:
      // For unknown node types, just render children
      return node.children ? convertChildrenToHtml(node.children) : ''
  }
}

function convertChildrenToHtml(children) {
  if (!children || !Array.isArray(children)) return ''
  return children.map(child => convertNodeToHtml(child)).join('')
}

function convertTextNodeToHtml(textNode) {
  if (!textNode.text) return ''
  
  let html = textNode.text
  
  // Apply formatting based on format flags
  if (textNode.format) {
    const format = textNode.format
    
    // Bold (format & 1)
    if (format & 1) {
      html = `<strong class="font-bold" style="white-space: pre-wrap;">${html}</strong>`
    }
    
    // Italic (format & 2)
    if (format & 2) {
      html = `<em class="italic" style="white-space: pre-wrap;">${html}</em>`
    }
    
    // Underline (format & 4)
    if (format & 4) {
      html = `<u style="white-space: pre-wrap;">${html}</u>`
    }
    
    // Strikethrough (format & 8)
    if (format & 8) {
      html = `<s style="white-space: pre-wrap;">${html}</s>`
    }
    
    // Code (format & 16)
    if (format & 16) {
      html = `<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" style="white-space: pre-wrap;">${html}</code>`
    }
  } else {
    // No formatting, just wrap in span with white-space preservation
    html = `<span style="white-space: pre-wrap;">${html}</span>`
  }
  
  return html
}

// Helper function to extract plain text from Lexical JSON (for meta descriptions, etc.)
export function lexicalToPlainText(lexicalJson) {
  if (!lexicalJson) return ''
  
  try {
    // If it's already HTML, strip tags
    if (typeof lexicalJson === 'string' && lexicalJson.includes('<')) {
      return lexicalJson.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    }
    
    // Parse JSON if it's a string
    const lexicalState = typeof lexicalJson === 'string' 
      ? JSON.parse(lexicalJson) 
      : lexicalJson
    
    if (!lexicalState.root || !lexicalState.root.children) {
      return ''
    }
    
    return extractTextFromNodes(lexicalState.root.children)
  } catch (error) {
    console.error('Error extracting text from Lexical:', error)
    return ''
  }
}

function extractTextFromNodes(nodes) {
  return nodes.map(node => extractTextFromNode(node)).join(' ')
}

function extractTextFromNode(node) {
  if (!node) return ''
  
  if (node.type === 'text') {
    return node.text || ''
  }
  
  if (node.children && Array.isArray(node.children)) {
    return extractTextFromNodes(node.children)
  }
  
  return ''
}