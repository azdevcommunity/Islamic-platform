"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HttpClient from "@/util/HttpClient"
import CacheProvider from "@/util/CacheProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { CategoryTreeSelector } from './CategoryTreeSelector'
import { 
  Save, 
  X, 
  AlertCircle, 
  FolderOpen, 
  Tag as TagIcon,
  Loader2,
  CheckCircle
} from 'lucide-react'

export function QuestionForm({ initialData }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState()
  const [categories, setCategories] = useState()

  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    categories: initialData?.categories?.map((c) => c.id) || [],
    tags: initialData?.tags?.map((t) => t.id) || [],
    answerType: "TEXT",
    author: 2,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchTags().catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    fetchCategories().catch((e) => console.log(e))
  }, [])

  const fetchTags = async () => {
    CacheProvider.fetchData("categories", 60, () => HttpClient.get("/categories")).then((res) => setCategories(res))
  }
  const fetchCategories = async () => {
    CacheProvider.fetchData("tags", 60, () => HttpClient.get("/tags")).then((res) => setTags(res))
  }

  const validateForm = () => {
    const newErrors = {}

    // if (formData.question.length < 5) {
    //     newErrors.question = "Soru en az 5 karakter olmalıdır."
    // }
    //
    // if (formData.answer.length < 10) {
    //     newErrors.answer = "Cevap en az 10 karakter olmalıdır."
    // }
    //
    // if (formData.categories.length === 0) {
    //     newErrors.categoryIds = "En az bir kategori seçmelisiniz."
    // }
    //
    // if (formData.tags.length === 0) {
    //     newErrors.tagIds = "En az bir etiket seçmelisiniz."
    // }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, id) => {
    setFormData((prev) => {
      const currentIds = prev[name]
      return {
        ...prev,
        [name]: currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [...currentIds, id],
      }
    })
  }

  const handleCategorySelectionChange = (selectedIds) => {
    setFormData((prev) => ({
      ...prev,
      categories: selectedIds
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      if (initialData) {
        // In a real app, this would call a server action
        console.log("Updating question:", initialData.id, formData)
      } else {
        await HttpClient.post("/questions", formData)
        // In a real app, this would call a server action
        console.log("Creating question:", formData)
      }
      router.push("/admin/questions")
      router.refresh()
    } catch (error) {
      console.error("Form gönderilirken hata oluştu:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Question Input */}
      <div className="space-y-3">
        <Label htmlFor="question" className="text-base font-semibold">
          Sual
        </Label>
        <Input
          id="question"
          name="question"
          value={formData.question}
          onChange={handleInputChange}
          placeholder="Sualı buraya yazın..."
          className={`h-12 text-base border-2 transition-colors ${
            errors.question 
              ? "border-red-300 focus:border-red-500" 
              : "focus:border-indigo-500"
          }`}
        />
        {errors.question && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errors.question}
          </div>
        )}
      </div>

      {/* Answer Input */}
      <div className="space-y-3">
        <Label htmlFor="answer" className="text-base font-semibold">
          Cavab
        </Label>
        <Textarea
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleInputChange}
          placeholder="Cavabı buraya yazın..."
          rows={8}
          className={`text-base border-2 transition-colors resize-none ${
            errors.answer 
              ? "border-red-300 focus:border-red-500" 
              : "focus:border-indigo-500"
          }`}
        />
        {errors.answer && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errors.answer}
          </div>
        )}
      </div>

      {/* Categories Selection */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 border border-amber-200 dark:border-amber-800">
              <FolderOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Kateqoriyalar</CardTitle>
              <CardDescription>Sual üçün ən az bir kateqoriya seçin</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {errors.categories && (
            <div className="flex items-center gap-2 text-sm text-red-600 mb-4">
              <AlertCircle className="h-4 w-4" />
              {errors.categories}
            </div>
          )}
          <CategoryTreeSelector
            categories={categories}
            selectedCategories={formData.categories}
            onSelectionChange={handleCategorySelectionChange}
          />
        </CardContent>
      </Card>

      {/* Tags Selection */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border border-purple-200 dark:border-purple-800">
              <TagIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Teqlər</CardTitle>
              <CardDescription>Sual üçün ən az bir teq seçin</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {errors.tags && (
            <div className="flex items-center gap-2 text-sm text-red-600 mb-4">
              <AlertCircle className="h-4 w-4" />
              {errors.tags}
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
            {tags &&
              tags.map((tag) => (
                <label
                  key={tag.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    formData.tags.includes(tag.id)
                      ? "border-purple-300 bg-purple-50 dark:bg-purple-950/50 shadow-sm"
                      : "border-slate-200 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-800"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag.id)}
                    onChange={() => handleCheckboxChange("tags", tag.id)}
                    className="h-4 w-4 rounded border-2 border-slate-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium">{tag.name}</span>
                  {formData.tags.includes(tag.id) && (
                    <CheckCircle className="h-4 w-4 text-purple-600 ml-auto" />
                  )}
                </label>
              ))}
          </div>
          {formData.tags.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-muted-foreground">Seçilmiş teqlər:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags
                  ?.filter(tag => formData.tags.includes(tag.id))
                  .map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950/50">
                      {tag.name}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/questions")}
          className="gap-2 h-12 px-8"
        >
          <X className="h-4 w-4" />
          Ləğv Et
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gap-2 h-12 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Yadda saxlanılır...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {initialData ? "Yenilə" : "Yarat"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

