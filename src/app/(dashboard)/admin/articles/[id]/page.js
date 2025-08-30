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
import { 
  Upload, 
  X, 
  Save, 
  Eye, 
  FileText, 
  Calendar as CalendarIcon, 
  User, 
  FolderOpen, 
  Image as ImageIcon, 
  AlertCircle, 
  CheckCircle2,
  ArrowLeft,
  Clock,
  Edit3,
  Settings,
  Sparkles
} from "lucide-react"
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
     
    // Generate HTML from editor state using $generateHtmlFromNodes
    if (editor) {
      newEditorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-emerald-500/10" />
          <div className="relative z-10 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/admin/articles")}
                  className="h-12 w-12 rounded-xl hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 transition-all duration-200 hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-0.5 shadow-xl">
                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                      <Edit3 className="h-8 w-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-20 blur-xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Məqalə Redaktəsi
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Mövcud məqaləni yeniləyin və dəyişiklik edin
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Son yenilənmə: {new Date().toLocaleTimeString('az-AZ')}
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Redaktə Rejimi
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <Alert className="border-emerald-200 bg-emerald-50 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <AlertDescription className="text-emerald-800 font-medium">
              Məqalə uğurla yeniləndi! Məqalə siyahısına yönləndirilirsiniz...
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50 shadow-lg shadow-red-500/10">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs defaultValue="content" className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5" />
              <div className="relative z-10 p-6">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1 h-14">
                  <TabsTrigger 
                    value="content" 
                    className="gap-3 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-700 font-semibold transition-all duration-200"
                  >
                    <FileText className="h-5 w-5" />
                    Məzmun
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="gap-3 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-700 font-semibold transition-all duration-200"
                  >
                    <Settings className="h-5 w-5" />
                    Ayarlar
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview" 
                    className="gap-3 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-700 font-semibold transition-all duration-200"
                  >
                    <Eye className="h-5 w-5" />
                    Önizləmə
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="content" className="space-y-8 mt-8">
              {/* Title */}
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Məqalə Başlığı</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">Məqalənizin əsas başlığını daxil edin</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Məqalə başlığını daxil edin..."
                    className="h-14 text-lg rounded-xl border-gray-200 bg-white focus:border-emerald-500 transition-all duration-200 font-medium"
                    disabled={loading || success}
                  />
                </CardContent>
              </Card>

              {/* Content */}
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <Edit3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Məqalə Məzmunu</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">Zəngin mətn editoru ilə məqalənizi yazın</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                    <Editor
                      key={`editor-${id}-${JSON.stringify(editorState).length}`}
                      editorSerializedState={editorState}
                      onSerializedChange={(value) => setEditorState(value)}
                      onChange={handleEditorChange}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm text-emerald-700 font-medium">
                      Formatlaşdırma, bağlantılar və şəkillər dəstəklənir. Mətnin görünüşünü yaxşılaşdırmaq üçün alətlərdən istifadə edin.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <ImageIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Qapaq Şəkli</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">Məqalə üçün əsas şəkil seçin</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6">
                  {!image ? (
                    <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-12 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors duration-200">
                      <div className="space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                          <Upload className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Şəkil Yüklə</h3>
                          <p className="text-gray-600">Məqalə üçün qapaq şəkli seçin və yükləyin</p>
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
                          size="lg"
                          onClick={() => document.getElementById('image-upload').click()}
                          disabled={loading || success}
                          className="h-12 px-8 rounded-xl border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                        >
                          <Upload className="h-5 w-5 mr-3" />
                          Şəkil Seç
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                        <Image
                          src={image}
                          alt="Qapaq şəkli"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-4 right-4 h-10 w-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                        disabled={loading || success}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8 mt-8">
              {/* Author Selection */}
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Müəllif Seçimi</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">Məqalənin müəllifini təyin edin</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Select value={selectedAuthor} onValueChange={setSelectedAuthor} disabled={loading || success}>
                    <SelectTrigger className="h-14 rounded-xl border-gray-200 bg-white focus:border-emerald-500 transition-all duration-200">
                      <SelectValue placeholder="Müəllif seçin..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200">
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
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <FolderOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Kateqoriya Seçimi</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">Məqalənin aid olduğu kateqoriyaları seçin</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <CategoryTreeSelector
                      categories={categories}
                      selectedCategories={selectedCategories}
                      onSelectionChange={handleCategorySelectionChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Publish Date */}
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <CalendarIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Nəşr Tarixi</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">Məqalənin nəşr olunacağı tarixi təyin edin</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <DatePicker
                    date={publishedAt}
                    setDate={setPublishedAt}
                    placeholder="Nəşr tarixini seçin"
                    className="h-14 rounded-xl border-gray-200 bg-white focus:border-emerald-500 transition-all duration-200"
                    disabled={loading || success}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-8 mt-8">
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Məqalə Önizləməsi</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">Məqalənizin son görünüşünü yoxlayın</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6">
                  {image && (
                    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={image}
                        alt="Qapaq şəkli"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {title || "Məqalə Başlığı"}
                      </h2>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                        {selectedAuthor && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">
                              Müəllif: {authors.find(a => a.id.toString() === selectedAuthor)?.name}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span className="font-medium">
                            Tarix: {publishedAt.toLocaleDateString('az-AZ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="prose prose-lg max-w-none prose-emerald">
                      <div 
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: content || "<p class='text-gray-500 italic'>Məqalə məzmunu buraya gələcək...</p>" 
                        }} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5" />
            <div className="relative z-10 p-6">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Save className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Dəyişiklikləri Yadda Saxla</h3>
                    <p className="text-sm text-gray-600">Məqalənizi yeniləmək üçün hazırsınız</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => router.push("/admin/articles")}
                    disabled={loading || success}
                    className="h-12 px-6 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Ləğv Et
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading || !isFormValid || success}
                    className="gap-3 h-12 px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl font-semibold"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Yenilənir...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Yeniləndi!
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        Məqaləni Yenilə
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateArticle

