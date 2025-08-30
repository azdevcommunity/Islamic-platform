"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  ChevronDown,
  Pencil,
  Trash,
  Plus,
  FolderOpen,
  Folder,
  Search,
  Filter,
  MoreVertical,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import HttpClient from "@/util/HttpClient"

// Import shadcn/ui components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({ id: null, name: "", parentId: null })
  const [isEditing, setIsEditing] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  // Fetch categories from API
  useEffect(() => {
    fetchCategories().catch(console.error) // Simplified error logging
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const res = await HttpClient.get("/categories")
      if (!res.ok) {
        const errorData = await res.text()
        throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText} - ${errorData}`)
      }
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
      toast({
        variant: "destructive",
        title: "Error Fetching Categories",
        description: err.message || "Could not load categories.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Generic input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Specific handler for shadcn/ui Select component
  const handleParentCategoryChange = (value) => {
    // The Select component passes the value directly
    // Handle the "null" string from the SelectItem if needed
    setFormData((prev) => ({
      ...prev,
      parentId: value === "null" || value === "" ? null : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isEditing ? `/categories/${formData.id}` : "/categories"
    const method = isEditing ? "PUT" : "POST"
    const actionVerb = isEditing ? "updated" : "created"

    try {
      const res = await HttpClient[method.toLowerCase()](url, formData) // Use bracket notation for method

      if (!res.ok) {
        // Handle non-OK responses
        const errorData = await res.text() // Or res.json() if error details are in JSON
        throw new Error(`Failed to save category: ${res.status} ${res.statusText} - ${errorData}`)
      }

      // Assuming success if res.ok is true
      toast({
        title: "Success",
        description: `Category ${actionVerb} successfully.`,
      })
      resetForm()
      await fetchCategories() // Fetch categories again after successful operation
    } catch (err) {
      console.error(`Failed to ${actionVerb} category:`, err)
      toast({
        variant: "destructive",
        title: `Error ${isEditing ? "Updating" : "Creating"} Category`,
        description: err.message || `Could not ${actionVerb} the category.`,
      })
    }
  }

  const handleEdit = (category) => {
    setFormData({ id: category.id, name: category.name, parentId: category.parentId })
    setIsEditing(true)
    // Optional: Scroll to form or give visual indication
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    // Consider using shadcn/ui Alert Dialog for confirmation
    if (!confirm("Are you sure you want to delete this category? This might also affect subcategories.")) return

    try {
      const res = await HttpClient.delete(`/categories/${id}`)

      if (!res.ok) {
        // Handle non-OK responses
        const errorData = await res.text() // Or res.json() if error details are in JSON
        throw new Error(`Failed to delete category: ${res.status} ${res.statusText} - ${errorData}`)
      }

      // Assuming success if res.ok is true
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      })
      await fetchCategories() // Refresh list
      if (formData.id === id) {
        // Reset form if the edited category was deleted
        resetForm()
      }
    } catch (err) {
      console.error("Failed to delete category:", err)
      toast({
        variant: "destructive",
        title: "Error Deleting Category",
        description: err.message || "Could not delete the category.",
      })
    }
  }

  const resetForm = () => {
    setFormData({ id: null, name: "", parentId: null })
    setIsEditing(false)
  }

  const toggleNode = (id) => {
    setExpandedNodes((prev) => (prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]))
  }

  // Filter categories based on search term
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get category count for a parent
  const getCategoryCount = (parentId) => {
    return categories.filter(cat => cat.parentId === parentId).length
  }

  // Recursive function to render the category tree
  const renderCategoryTree = (parentId = null, level = 0) => {
    const categoriesToShow = searchTerm
      ? filteredCategories.filter(cat => cat.parentId === parentId)
      : categories.filter(cat => cat.parentId === parentId)

    if (categoriesToShow.length === 0) return null

    return (
      <div className={`${level > 0 ? "ml-8 border-l-2 border-slate-200/60 dark:border-slate-700/60 pl-6" : ""} space-y-3`}>
        {categoriesToShow.map((category) => {
          const hasChildren = categories.some((cat) => cat.parentId === category.id)
          const isExpanded = expandedNodes.includes(category.id)
          const childCount = getCategoryCount(category.id)

          return (
            <div key={category.id} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-[1.02]">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-center justify-between p-4">
                  <div className="flex items-center gap-4 flex-grow min-w-0">
                    {/* Expand/Collapse Button */}
                    {hasChildren ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleNode(category.id)}
                        className="h-10 w-10 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 hover:scale-105"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                        )}
                        <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
                      </Button>
                    ) : (
                      <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <Folder className="h-4 w-4 text-gray-500" />
                      </div>
                    )}

                    {/* Category Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900 truncate text-lg">
                          {category.name}
                        </h3>
                        {hasChildren && (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            {childCount} alt kateqoriya
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {level === 0 ? 'Əsas kateqoriya' : `${level}. səviyyə kateqoriya`}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      className="h-10 w-10 rounded-xl hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 transition-all duration-200 hover:scale-105"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {category.name}</span>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 w-10 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => handleEdit(category)}
                          className="flex items-center gap-2"
                        >
                          <Pencil className="h-4 w-4" />
                          Redaktə et
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(category.id)}
                          className="flex items-center gap-2 text-red-600 focus:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Render children */}
              {isExpanded && hasChildren && (
                <div className="mt-4">
                  {renderCategoryTree(category.id, level + 1)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-emerald-500/10" />
          <div className="relative z-10 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-0.5 shadow-xl">
                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                      <FolderOpen className="h-8 w-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-20 blur-xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Kateqoriya İdarəsi
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Məhsul kateqoriyalarını yaradın, redaktə edin və təşkil edin
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {categories.length} Kateqoriya
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-1">
            <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {isEditing ? "Kateqoriyanı Redaktə Et" : "Yeni Kateqoriya"}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {isEditing ? "Mövcud kateqoriyanı yeniləyin" : "Yeni kateqoriya əlavə edin"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Kateqoriya Adı
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="məs., Elektronika, Geyim, Kitablar"
                      required
                      className="h-12 rounded-xl border-gray-200 bg-white focus:border-emerald-500 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="parentId" className="text-sm font-semibold text-gray-700">
                      Ana Kateqoriya
                    </Label>
                    <Select
                      key={formData.id ?? "new"}
                      name="parentId"
                      value={formData.parentId === null ? "null" : String(formData.parentId)}
                      onValueChange={handleParentCategoryChange}
                    >
                      <SelectTrigger id="parentId" className="h-12 rounded-xl border-gray-200 bg-white">
                        <SelectValue placeholder="-- Ana Kateqoriya Yoxdur --" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200">
                        <SelectItem value="null">-- Ana Kateqoriya Yoxdur --</SelectItem>
                        {categories
                          .filter(cat => cat.id !== formData.id)
                          .map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                              {cat.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                    >
                      {isEditing ? "Kateqoriyanı Yenilə" : "Kateqoriya Yarat"}
                    </Button>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="h-12 rounded-xl border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
                      >
                        Ləğv Et
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Categories List Section */}
          <div className="xl:col-span-2">
            <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <FolderOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Kateqoriya Ağacı
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Bütün kateqoriyaları idarə edin və təşkil edin
                      </CardDescription>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Kateqoriya axtar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 h-10 rounded-xl border-gray-200 bg-white"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    <span className="ml-3 text-gray-600">Yüklənir...</span>
                  </div>
                ) : categories.length > 0 ? (
                  <div className="space-y-4">
                    {renderCategoryTree()}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Kateqoriya Tapılmadı
                    </h3>
                    <p className="text-gray-600">
                      İlk kateqoriyanızı yaratmaq üçün yuxarıdakı formu istifadə edin!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default CategoriesAdmin
