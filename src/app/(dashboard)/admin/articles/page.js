"use client"

import React, { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Search, FileText, Calendar, User, Eye, AlertCircle, CheckCircle2, Filter, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown, X, AlertTriangle, Tag, FolderOpen, Settings, RefreshCw } from "lucide-react"
import HttpClient from "@/util/HttpClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [paginatedArticles, setPaginatedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedAuthors, setSelectedAuthors] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [allCategories, setAllCategories] = useState([])
  const [allAuthors, setAllAuthors] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState(null)
  const filterMenuRef = useRef(null)
  const itemsPerPageMenuRef = useRef(null)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [itemsPerPageMenuOpen, setItemsPerPageMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState('table') // 'card' or 'table'

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get(`/articles?page=0&size=1000`)
      const data = await response.json()

      const receivedArticles = data.content.map((a) => ({
        id: a.id,
        title: a.title,
        image: a.image,
        publishedAt: a.publishedAt,
        authorName: a.authorName,
        authorId: a.author?.id,
        categories: a.categories?.map((c, index) => {
          // Handle both string and object formats
          if (typeof c === 'string') {
            return { id: index, name: c }
          } else if (typeof c === 'object' && c?.name) {
            return { id: c.id || index, name: c.name }
          }
          return { id: index, name: String(c) }
        }) || [],
      }))

      setArticles(receivedArticles)
      setFilteredArticles(receivedArticles)
    } catch (err) {
      console.error(err)
      setError("Makaleler yüklenirken hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await HttpClient.get("/categories")
      const data = await response.json()
      setAllCategories(Array.isArray(data) ? data : data?.content || [])
    } catch (error) {
      console.error("Kategori verisi alınamadı:", error)
    }
  }

  const fetchAuthors = async () => {
    try {
      const response = await HttpClient.get("/authors")
      const data = await response.json()
      setAllAuthors(Array.isArray(data) ? data : data?.content || [])
    } catch (error) {
      console.error("Yazar verisi alınamadı:", error)
    }
  }

  useEffect(() => {
    fetchArticles().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    fetchCategories().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    fetchAuthors().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    setPaginatedArticles(filteredArticles.slice(startIndex, startIndex + itemsPerPage))
  }, [filteredArticles, currentPage, itemsPerPage])

  useEffect(() => {
    const filtered = articles.filter((a) => {
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategories =
        selectedCategories.length === 0 || selectedCategories.some((cat) => a.categories.some((ac) => ac.id === cat.id))
      const matchesAuthors =
        selectedAuthors.length === 0 || selectedAuthors.some((author) => a.authorId === author.id)

      return matchesSearch && matchesCategories && matchesAuthors
    })

    setFilteredArticles(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, selectedAuthors, itemsPerPage, articles])

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.some((c) => c.id === category.id) ? prev.filter((c) => c.id !== category.id) : [...prev, category],
    )
  }

  const handleAuthorToggle = (author) => {
    setSelectedAuthors((prev) =>
      prev.some((a) => a.id === author.id) ? prev.filter((a) => a.id !== author.id) : [...prev, author],
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedAuthors([])
  }

  const handleDeleteClick = (id) => {
    setArticleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (articleToDelete) {
      try {
        await HttpClient.delete(`/articles/${articleToDelete}`)
        setArticles(articles.filter((a) => a.id !== articleToDelete))
        setFilteredArticles(filteredArticles.filter((a) => a.id !== articleToDelete))
        const newTotalPages = Math.ceil((filteredArticles.length - 1) / itemsPerPage)
        setTotalPages(newTotalPages)
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        }
        setSuccess("Makale başarıyla silindi!")
        setTimeout(() => setSuccess(null), 3000)
      } catch (error) {
        console.error("Makale silinirken hata oluştu:", error)
        setError("Makale silinirken hata oluştu.")
      }
      setDeleteDialogOpen(false)
      setArticleToDelete(null)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setFilterMenuOpen(false)
      }
      if (itemsPerPageMenuRef.current && !itemsPerPageMenuRef.current.contains(event.target)) {
        setItemsPerPageMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedAuthors.length > 0

  const stats = {
    total: articles.length,
    filtered: filteredArticles.length,
    categories: allCategories.length,
    authors: allAuthors.length
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "—"
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-emerald-500/10" />
        <div className="relative z-10 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-0.5 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                    <FileText className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-20 blur-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Məqalə İdarəsi
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Bütün məqalələrinizi idarə edin və təşkil edin
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  fetchArticles()
                  fetchCategories()
                  fetchAuthors()
                }}
                className="gap-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Yenilə
              </Button>
              <Button asChild className="gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/admin/articles/create">
                  <Plus className="h-4 w-4" />
                  Yeni Məqalə
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="relative z-10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ümumi Məqalə</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="relative z-10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Filtrlənmiş</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.filtered}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <Filter className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="relative z-10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kateqoriyalar</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.categories}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="relative z-10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Yazarlar</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.authors}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Alert */}
      {success && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {success}
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

      {/* Search and Filter Controls */}
      <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
        <CardHeader className="relative z-10 border-b bg-gradient-to-r from-emerald-50/50 to-emerald-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Search className="h-5 w-5" />
              Axtarış və Filtr
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('card')}
                className={`gap-2 ${viewMode === 'card' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'}`}
              >
                <Eye className="h-4 w-4" />
                Kart
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className={`gap-2 ${viewMode === 'table' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'}`}
              >
                <Settings className="h-4 w-4" />
                Cədvəl
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and filter controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Makaleleri axtarın..."
                  className="pl-10 h-12 text-base border-2 focus:border-blue-300 dark:focus:border-blue-700 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative" ref={filterMenuRef}>
                <Button
                  variant="outline"
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="h-12 px-6 gap-2 border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Filtrələ
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedCategories.length + selectedAuthors.length + (searchQuery ? 1 : 0)}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {filterMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 border-2 border-slate-200 dark:border-slate-700">
                    <div className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">Filtrlər</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFilterMenuOpen(false)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-3 flex items-center gap-2">
                            <FolderOpen className="h-4 w-4" />
                            Kateqoriyalar
                          </h5>
                          <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                            {allCategories.map((category) => (
                              <label key={category.id} className="flex items-center space-x-2 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.some(c => c.id === category.id)}
                                  onChange={() => handleCategoryToggle(category)}
                                  className="h-4 w-4 rounded border-2 border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm group-hover:text-blue-600 transition-colors">{category.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-3 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Yazarlar
                          </h5>
                          <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                            {allAuthors.map((author) => (
                              <label key={author.id} className="flex items-center space-x-2 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={selectedAuthors.some(a => a.id === author.id)}
                                  onChange={() => handleAuthorToggle(author)}
                                  className="h-4 w-4 rounded border-2 border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm group-hover:text-blue-600 transition-colors">{author.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={clearFilters}
                          disabled={!hasActiveFilters}
                          className="gap-2"
                        >
                          <X className="h-4 w-4" />
                          Təmizlə
                        </Button>
                        <Button
                          onClick={() => setFilterMenuOpen(false)}
                          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                        >
                          Tətbiq Et
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Aktiv filtrlər:
                </span>

                {searchQuery && (
                  <Badge variant="secondary" className="gap-1 px-3 py-1">
                    <Search className="h-3 w-3" />
                    Axtarış: {searchQuery}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="h-4 w-4 p-0 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}

                {selectedCategories.map((category) => (
                  <Badge key={category.id} variant="outline" className="gap-1 px-3 py-1 border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/50">
                    <FolderOpen className="h-3 w-3" />
                    {category.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCategoryToggle(category)}
                      className="h-4 w-4 p-0 hover:bg-amber-200 dark:hover:bg-amber-800 rounded-full ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}

                {selectedAuthors.map((author) => (
                  <Badge key={author.id} variant="outline" className="gap-1 px-3 py-1 border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950/50">
                    <User className="h-3 w-3" />
                    {author.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAuthorToggle(author)}
                      className="h-4 w-4 p-0 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-sm hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 gap-2"
                >
                  <X className="h-4 w-4" />
                  Hamısını Təmizlə
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Articles Display */}
      {paginatedArticles.length === 0 ? (
        <Card className="border-2 shadow-lg">
          <CardContent className="py-16">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {hasActiveFilters ? "Filtrlərə uyğun makale tapılmadı" : "Hələ makale yoxdur"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {hasActiveFilters
                    ? "Filtrlər dəyişdirin və ya yeni axtarış edin"
                    : "İlk makalenizi yaratmaq üçün aşağıdakı düyməni basın"
                  }
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Filtrlər Təmizlə
                  </Button>
                )}
                <Button asChild className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/admin/articles/create">
                    <Plus className="h-4 w-4" />
                    İlk Makaleyi Yarat
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {viewMode === 'card' ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
                <Card key={article.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50 hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {article.image && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardTitle className="text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.publishedAt)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Link href={`/admin/articles/${article.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(article.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {article.categories.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <FolderOpen className="h-3 w-3" />
                            Kateqoriyalar
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {article.categories.map((category) => (
                              <Badge key={category.id} variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/50">
                                {category.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {article.authorName && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <User className="h-3 w-3" />
                            Yazar
                          </div>
                          <Badge variant="secondary" className="text-xs border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950/50">
                            {article.authorName}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-2 shadow-xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 border-b-2">
                        <TableHead className="px-6 py-4 text-left font-semibold">
                          Görsel
                        </TableHead>
                        <TableHead className="px-6 py-4 text-left font-semibold">
                          Başlık
                        </TableHead>
                        <TableHead className="px-6 py-4 text-left font-semibold">
                          Kateqoriyalar
                        </TableHead>
                        <TableHead className="px-6 py-4 text-left font-semibold">
                          Yazar
                        </TableHead>
                        <TableHead className="px-6 py-4 text-left font-semibold">
                          Yayın Tarihi
                        </TableHead>
                        <TableHead className="px-6 py-4 text-center font-semibold w-32">
                          Əməliyyatlar
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y">
                      {paginatedArticles.map((article) => (
                        <TableRow key={article.id} className="group hover:bg-muted/30 transition-colors">
                          <TableCell className="px-6 py-4">
                            <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                              {article.image ? (
                                <Image
                                  src={article.image}
                                  alt={article.title}
                                  width={64}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {truncateText(article.title, 40)}
                              </div>
                              <div className="text-xs text-muted-foreground">ID: {article.id}</div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {article.categories && article.categories.length > 0 ? (
                                <>
                                  {article.categories.slice(0, 2).map(category => (
                                    <Badge key={category.id} variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/50">
                                      {category.name}
                                    </Badge>
                                  ))}
                                  {article.categories.length > 2 && (
                                    <Badge key={`more-${article.id}`} variant="outline" className="text-xs">
                                      +{article.categories.length - 2}
                                    </Badge>
                                  )}
                                </>
                              ) : (
                                <span className="text-muted-foreground text-sm">—</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{article.authorName || "—"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatDate(article.publishedAt)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                                <Link href={`/admin/articles/${article.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(article.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Pagination */}
      {paginatedArticles.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Toplam {filteredArticles.length} makaleden {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredArticles.length)} arası gösteriliyor
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Səhifə başına:</span>
              <div className="relative" ref={itemsPerPageMenuRef}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setItemsPerPageMenuOpen(!itemsPerPageMenuOpen)}
                  className="w-20 justify-between gap-2"
                >
                  {itemsPerPage}
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {itemsPerPageMenuOpen && (
                  <div className="absolute top-full left-0 z-50 mt-1 w-20 origin-top-left rounded-lg bg-white dark:bg-slate-900 shadow-xl ring-1 ring-black/5 dark:ring-white/10 border-2 border-slate-200 dark:border-slate-700">
                    <div className="py-1">
                      {[5, 10, 20, 50].map((value) => (
                        <button
                          key={value}
                          onClick={() => {
                            setItemsPerPage(value)
                            setItemsPerPageMenuOpen(false)
                          }}
                          className={`block w-full px-3 py-2 text-left text-sm transition-colors ${
                            itemsPerPage === value 
                              ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-medium" 
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="gap-2"
              >
                Əvvəlki
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 p-0 ${
                        currentPage === page 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="gap-2"
              >
                Sonrakı
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setDeleteDialogOpen(false)}
            />
            <Card className="relative w-full max-w-md mx-auto shadow-2xl border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Makaleyi Sil</CardTitle>
                    <CardDescription>Bu əməliyyat geri alına bilməz</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Bu makaleyi silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz və makale həmişəlik silinəcək.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Ləğv Et
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmDelete}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Sil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}



