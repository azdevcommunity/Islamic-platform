"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Editor } from "@/components/editor/editor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import HttpClient from "@/util/HttpClient"
import { ChevronDown, Upload, X, Save, Eye, FileText, Calendar as CalendarIcon, User, FolderOpen, Image as ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { CategoryTreeSelector } from "@/components/admin/questions/CategoryTreeSelector"
import { $generateHtmlFromNodes } from "@lexical/html"

function UpdateArticle() {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  
  // Handle editor state changes
  const [editorState, setEditorState] = useState({
    root: {
      children: [
        {
          children: [],
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
  })

  // Convert HTML content to Lexical JSON state
  const convertHtmlToLexicalState = (htmlContent) => {
    if (!htmlContent || htmlContent.trim() === '') {
      return {
        root: {
          children: [
            {
              children: [],
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
    }

    try {
      // Create a temporary DOM element to parse HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlContent
      
      // Get all text content
      const allText = tempDiv.textContent || tempDiv.innerText || ''
      console.log("Extracted text content:", allText)
      
      if (!allText.trim()) {
        return {
          root: {
            children: [
              {
                children: [],
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
      }
      
      // Split text into paragraphs (by double newlines or by sentences)
      const paragraphs = allText
        .split(/\n\s*\n|\. (?=[A-Z])|(?<=\.)\s+(?=[A-Z])/g)
        .map(p => p.trim())
        .filter(p => p.length > 0)
      
      console.log("Split paragraphs:", paragraphs)
      
      const children = paragraphs.map(paragraph => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: paragraph,
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      }))
      
      return {
        root: {
          children: children.length > 0 ? children : [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: allText.trim(),
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
    } catch (error) {
      console.error("Error converting HTML to Lexical state:", error)
      
      return {
        root: {
          children: [
            {
              children: [],
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
    }
  }
  
  const handleEditorChange = (newEditorState, editor) => {
    console.log("=== EDITOR STATE CHANGE ===")
    console.log("New editor state:", newEditorState)
    
    // Generate HTML from editor state using $generateHtmlFromNodes
    if (editor) {
      newEditorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        console.log("Generated HTML:", htmlString)
        setContent(htmlString)
      })
    }
  }


  const [publishedAt, setPublishedAt] = useState(new Date())
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsRes, categoriesRes] = await Promise.all([
          HttpClient.get("/authors"),
          HttpClient.get("/categories")
        ])

        const authorsData = await authorsRes.json()
        const categoriesData = await categoriesRes.json()

        setAuthors(Array.isArray(authorsData) ? authorsData : authorsData?.content || [])
        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.content || [])

        // Fetch article data if ID exists
        if (id) {
          const articleRes = await HttpClient.get(`/articles/${id}`, { "X-Admin-Request": true })
          const articleData = await articleRes.json()

          if (articleData?.status === 400 || articleData?.status === 404) {
            const message = articleData.status === 404 ? articleData.message : "Hata oluştu"
            setError(message)
            setTimeout(() => {
              router.push("/admin/articles")
            }, 2000)
            return
          }

          setTitle(articleData.title)
          setImage(articleData.image)
          setPublishedAt(new Date(articleData.publishedAt))
          setSelectedAuthor(articleData.author?.id?.toString() || "")
          // Handle categories - they might come as objects or just IDs
          const categoryIds = articleData.categories || []
          const validCategoryIds = categoryIds
            .map(cat => {
              // If it's an object with id property, extract the id
              if (typeof cat === 'object' && cat?.id) {
                return cat.id
              }
              // If it's already a number or string ID, use it directly
              return cat
            })
            .filter(id => id != null && id !== undefined && id !== "")
            .map(id => parseInt(id, 10))
            .filter(id => !isNaN(id) && id > 0)
          
          console.log("Article categories from API:", articleData.categories)
          console.log("Processed category IDs:", validCategoryIds)
          setSelectedCategories(validCategoryIds)
          
          // Handle content - for now, let's use a simple approach
          if (articleData.content) {
            console.log("=== ARTICLE CONTENT DEBUG ===")
            console.log("Raw content:", articleData.content)
            console.log("Content type:", typeof articleData.content)
            console.log("Content length:", articleData.content.length)
            
            // Set HTML content for preview
            setContent(articleData.content)
            
            // Try to parse as JSON first
            try {
              const parsedContent = JSON.parse(articleData.content)
              if (parsedContent.root) {
                console.log("✅ Found Lexical JSON format:", parsedContent)
                setEditorState(parsedContent)
                
                // We'll generate HTML when the editor is ready
                // For now, set a placeholder
                setContent("") // Will be generated by editor
              } else {
                throw new Error("Not Lexical format")
              }
            } catch (error) {
              console.log("❌ JSON parse error:", error)
              console.log("Treating as HTML content")
              
              // Set HTML content
              setContent(articleData.content)
              
              // Convert HTML to Lexical state
              const lexicalState = convertHtmlToLexicalState(articleData.content)
              setEditorState(lexicalState)
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Veriler yüklenirken bir hata oluştu.")
      }
    }
    fetchData()
  }, [id, router])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImageFile(null)
  }

  const handleCategorySelectionChange = (selectedIds) => {
    setSelectedCategories(selectedIds)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!title || !content || !selectedAuthor || selectedCategories.length === 0) {
      setError("Tüm alanlar zorunludur!")
      setLoading(false)
      return
    }

    const authorId = parseInt(selectedAuthor, 10)
    if (isNaN(authorId) || authorId <= 0) {
      setError("Geçerli bir yazar seçiniz!")
      setLoading(false)
      return
    }

    // Filter out null/undefined values and ensure all category IDs are valid integers
    console.log("Raw selectedCategories:", selectedCategories)
    const validCategories = selectedCategories
      .filter(catId => catId != null && catId !== undefined && catId !== "")
      .map(catId => parseInt(catId, 10))
      .filter(catId => !isNaN(catId) && catId > 0)
    
    console.log("Valid categories after filtering:", validCategories)

    if (validCategories.length === 0) {
      setError("En az bir kategori seçiniz!")
      setLoading(false)
      return
    }

    try {
      const body = {
        image,
        title: title.trim(),
        content: JSON.stringify(editorState), // Send Lexical JSON as primary content
        contentHtml: content, // Generated HTML for display/SEO
        publishedAt,
        authorId: authorId,
        categories: validCategories,
      }

      const response = await HttpClient.put(`/articles/${id}`, body)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Makale güncellenirken bir hata oluştu.")
      }

      setSuccess(true)

      // Revalidate cache
      try {
        await fetch(`/api/revalidate?path=/articles/${id}&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`)
        await fetch(`/api/revalidate?path=/articles&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`)
      } catch (revalidateError) {
        console.warn("Cache revalidation failed:", revalidateError)
      }

      setTimeout(() => {
        router.push("/admin/articles")
      }, 2000)
    } catch (error) {
      console.error("Error updating article:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = title && content && selectedAuthor && selectedCategories.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 transition-colors duration-300">
      <div className="w-full mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Makale Düzenle
            </h1>
            <p className="text-lg text-muted-foreground">
              Mevcut makaleyi düzenleyin ve güncelleyin
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Makale başarıyla güncellendi! Makale listesine yönlendiriliyorsunuz...
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="gap-2">
                <FileText className="h-4 w-4" />
                İçerik
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <User className="h-4 w-4" />
                Ayarlar
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Önizleme
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {/* Title */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Makale Başlığı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Makale başlığını girin..."
                    className="h-12 text-lg border-2 focus:border-blue-300 dark:focus:border-blue-700 transition-colors"
                    disabled={loading || success}
                  />
                </CardContent>
              </Card>

              {/* Content */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Makale İçeriği
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {console.log("🎯 Passing editorState to Editor:", editorState)}
                  <Editor
                    key={`editor-${id}-${JSON.stringify(editorState).length}`}
                    editorSerializedState={editorState}
                    onSerializedChange={(value) => setEditorState(value)}
                    onChange={handleEditorChange}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Zengin metin editörü ile makale içeriğinizi yazın. Biçimlendirme, bağlantılar ve görseller desteklenmektedir.
                  </p>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Kapak Görseli
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!image ? (
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Görsel Yükle</h3>
                          <p className="text-muted-foreground">Makale için kapak görseli seçin</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          disabled={loading || success}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image-upload').click()}
                          disabled={loading || success}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Görsel Seç
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative w-full h-80 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt="Kapak görseli"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2"
                        disabled={loading || success}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Author Selection */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Yazar Seçimi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedAuthor} onValueChange={setSelectedAuthor} disabled={loading || success}>
                    <SelectTrigger className="h-12 border-2">
                      <SelectValue placeholder="Yazar seçin..." />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id.toString()}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Category Selection */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    Kategori Seçimi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CategoryTreeSelector
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onSelectionChange={handleCategorySelectionChange}
                  />
                </CardContent>
              </Card>

              {/* Publish Date */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Yayın Tarihi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DatePicker
                    date={publishedAt}
                    setDate={setPublishedAt}
                    placeholder="Yayın tarihini seçin"
                    className="h-12 border-2"
                    disabled={loading || success}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Makale Önizlemesi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {image && (
                    <div className="relative w-full h-80 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt="Kapak görseli"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{title || "Makale Başlığı"}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      {selectedAuthor && (
                        <span>Yazar: {authors.find(a => a.id.toString() === selectedAuthor)?.name}</span>
                      )}
                      <span>Tarih: {publishedAt.toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: content || "Makale içeriği buraya gelecek..." }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/articles")}
              disabled={loading || success}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading || !isFormValid || success}
              className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Güncelleniyor...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Güncellendi!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Makaleyi Güncelle
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateArticle

