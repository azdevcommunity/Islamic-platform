"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import HttpClient from "@/util/HttpClient"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import QuestionsPageSkeleton from '@/components/admin/questions/QuestionsPageSkeleton'
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  ChevronDown,
  X,
  AlertTriangle,
  Tag,
  FolderOpen,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  Settings,
  RefreshCw
} from 'lucide-react'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [paginatedQuestions, setPaginatedQuestions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [allCategories, setAllCategories] = useState([])
  const [allTags, setAllTags] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const filterMenuRef = useRef(null)
  const itemsPerPageMenuRef = useRef(null)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [itemsPerPageMenuOpen, setItemsPerPageMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState('card') // 'card' or 'table'

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get(`/questions?containsTag=1&containsCategory=1`)
      const data = await response.json()

      const receivedQuestions = data.content.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        categories: q.categories.map((c) => ({ id: c.id, name: c.name })),
        tags: q.tags.map((t) => ({ id: t.id, name: t.name })),
      }))

      setQuestions(receivedQuestions)
      setFilteredQuestions(receivedQuestions)
      setTotalPages(data.page.totalPages)
      setCurrentPage(data.page.number + 1)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await HttpClient.get("/categories")
      const data = await response.json()
      setAllCategories(data)
    } catch (error) {
      console.error("Kategori verisi alınamadı:", error)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await HttpClient.get("/tags")
      const data = await response.json()
      setAllTags(data)
    } catch (error) {
      console.error("Etiket verisi alınamadı:", error)
    }
  }

  useEffect(() => {
    fetchTags().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    fetchQuestions().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    fetchCategories().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    setPaginatedQuestions(filteredQuestions.slice(startIndex, startIndex + itemsPerPage))
  }, [filteredQuestions, currentPage, itemsPerPage])

  useEffect(() => {
    const filtered = questions.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategories =
        selectedCategories.length === 0 || selectedCategories.some((cat) => q.categories.some((qc) => qc.id === cat.id))

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => q.tags.some((qt) => qt.id === tag.id))

      return matchesSearch && matchesCategories && matchesTags
    })

    setFilteredQuestions(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, selectedTags, itemsPerPage, questions])

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.some((c) => c.id === category.id) ? prev.filter((c) => c.id !== category.id) : [...prev, category],
    )
  }

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id) ? prev.filter((t) => t.id !== tag.id) : [...prev, tag],
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedTags([])
  }

  const handleDeleteClick = (id) => {
    setQuestionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (questionToDelete) {
      try {
        setQuestions(questions.filter((q) => q.id !== questionToDelete))
        setFilteredQuestions(filteredQuestions.filter((q) => q.id !== questionToDelete))
        const newTotalPages = Math.ceil((filteredQuestions.length - 1) / itemsPerPage)
        setTotalPages(newTotalPages)
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        }
      } catch (error) {
        console.error("Soru silinirken hata oluştu:", error)
      }
      setDeleteDialogOpen(false)
      setQuestionToDelete(null)
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

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0

  const stats = {
    total: questions.length,
    filtered: filteredQuestions.length,
    categories: allCategories.length,
    tags: allTags.length
  }

  if (loading) {
    return <QuestionsPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Suallar İdarəsi
            </h1>
            <p className="text-lg text-muted-foreground">
              İslami sualları idarə edin və cavabları təşkil edin
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchQuestions()
                fetchCategories()
                fetchTags()
              }}
              className="gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-900/20 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Yenilə
            </Button>
            <Button asChild className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/admin/questions/create">
                <Plus className="h-4 w-4" />
                Yeni Sual
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ümumi Suallar</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Filtrlənmiş</p>
                <p className="text-3xl font-bold text-blue-600">{stats.filtered}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                <Filter className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kateqoriyalar</p>
                <p className="text-3xl font-bold text-amber-600">{stats.categories}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Teqlər</p>
                <p className="text-3xl font-bold text-purple-600">{stats.tags}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50 flex items-center justify-center">
                <Tag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-2 shadow-xl">
        <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Axtarış və Filtr
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('card')}
                className={`gap-2 ${viewMode === 'card' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : ''}`}
              >
                <Eye className="h-4 w-4" />
                Kart
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className={`gap-2 ${viewMode === 'table' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : ''}`}
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
                  placeholder="Sualları axtarın..."
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
                      {selectedCategories.length + selectedTags.length + (searchQuery ? 1 : 0)}
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
                                  className="h-4 w-4 rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                                />
                                <span className="text-sm group-hover:text-indigo-600 transition-colors">{category.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-3 flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            Teqlər
                          </h5>
                          <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                            {allTags.map((tag) => (
                              <label key={tag.id} className="flex items-center space-x-2 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={selectedTags.some(t => t.id === tag.id)}
                                  onChange={() => handleTagToggle(tag)}
                                  className="h-4 w-4 rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                                />
                                <span className="text-sm group-hover:text-indigo-600 transition-colors">{tag.name}</span>
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

                {selectedTags.map((tag) => (
                  <Badge key={tag.id} variant="outline" className="gap-1 px-3 py-1 border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950/50">
                    <Tag className="h-3 w-3" />
                    {tag.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTagToggle(tag)}
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

      {/* Questions Display */}
      {paginatedQuestions.length === 0 ? (
        <Card className="border-2 shadow-lg">
          <CardContent className="py-16">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <HelpCircle className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {hasActiveFilters ? "Filtrlərə uyğun sual tapılmadı" : "Hələ sual yoxdur"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {hasActiveFilters 
                    ? "Filtrlər dəyişdirin və ya yeni axtarış edin" 
                    : "İlk sualınızı yaratmaq üçün aşağıdakı düyməni basın"
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
                  <Link href="/admin/questions/create">
                    <Plus className="h-4 w-4" />
                    İlk Sualı Yarat
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
              {paginatedQuestions.map((question) => (
                <Card key={question.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50 hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {question.question}
                        </CardTitle>
                        <CardDescription className="mt-2 line-clamp-3">
                          {question.answer}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Link href={`/admin/questions/${question.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(question.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {question.categories.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <FolderOpen className="h-3 w-3" />
                            Kateqoriyalar
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {question.categories.map((category) => (
                              <Badge key={category.id} variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/50">
                                {category.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {question.tags.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <Tag className="h-3 w-3" />
                            Teqlər
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag) => (
                              <Badge key={tag.id} variant="secondary" className="text-xs border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950/50">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
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
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b-2">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">
                          Sual
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Kateqoriyalar
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Teqlər
                        </th>
                        <th className="px-6 py-4 text-center font-semibold w-32">
                          Əməliyyatlar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {paginatedQuestions.map((question) => (
                        <tr key={question.id} className="group hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {question.question}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {question.answer}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {question.categories.map((category) => (
                                <Badge key={category.id} variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/50">
                                  {category.name}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {question.tags.map((tag) => (
                                <Badge key={tag.id} variant="secondary" className="text-xs border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950/50">
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                                <Link href={`/admin/questions/${question.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(question.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Pagination */}
      {paginatedQuestions.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Toplam {filteredQuestions.length} sualdan {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredQuestions.length)} arası gösteriliyor
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
                    <CardTitle className="text-lg">Sualı Sil</CardTitle>
                    <CardDescription>Bu əməliyyat geri alına bilməz</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Bu sualı silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz və sual həmişəlik silinəcək.
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