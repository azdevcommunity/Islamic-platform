"use client"

import { useState } from "react"
import { Editor } from "@/components/editor/editor"
import { $generateHtmlFromNodes } from "@lexical/html"

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Merhaba Dünya! 🚀",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

export default function EditorPage() {
  const [editorState, setEditorState] = useState(initialValue)
  const [htmlContent, setHtmlContent] = useState("")
  
  const handleEditorChange = (newEditorState, editor) => {
    console.log("=== EDITOR STATE CHANGE ===")
    console.log("New editor state:", newEditorState)
    console.log("Editor:", editor)
    
    // Generate HTML from editor state
    if (editor) {
      newEditorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        console.log("Generated HTML:", htmlString)
        setHtmlContent(htmlString)
      })
    }
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Gelişmiş Editor Testi</h1>
      
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={(value) => setEditorState(value)}
        onChange={handleEditorChange}
      />
      
      {/* Content Display */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Editor Content</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              HTML Output: (Length: {htmlContent.length})
            </h3>
            <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border overflow-auto max-h-40">
              <code>{htmlContent || 'Henüz HTML content yok...'}</code>
            </pre>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Rendered HTML:</h3>
            <div className="bg-white dark:bg-gray-900 p-3 rounded border prose prose-sm max-w-none min-h-[50px]">
              {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              ) : (
                <p className="text-gray-500 italic">Henüz content yok...</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">JSON State:</h3>
            <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border overflow-auto max-h-40">
              <code>{JSON.stringify(editorState, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
