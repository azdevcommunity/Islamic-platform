"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, BookOpen, Clock, User, Eye, Edit } from "lucide-react"
import Image from "next/image"
import HttpClient from "@/util/HttpClient"

const BookList = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const res = await HttpClient.get("/books")
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const data = await res.json()
        setBooks(Array.isArray(data) ? data : data?.content || [])
      } catch (err) {
        console.error("Error fetching books:", err)
        setError("Kitaplar yüklenirken bir hata oluştu.")
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const filteredBooks = books.filter(book =>
    book.title?.toLowerCase().includes(search.toLowerCase()) ||
    book.authorName?.toLowerCase().includes(search.toLowerCase())
  )

  const LoadingSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="w-full h-48 bg-muted rounded-md" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Kitap Yönetimi
            </h1>
            <p className="text-lg text-muted-foreground">
              Platformdakı kitapları idarə edin və yenilərini əlavə edin
            </p>
          </div>
          <Button asChild className="gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/admin/book/create">
              <Plus className="h-4 w-4" />
              Yeni Kitap
            </Link>
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Kitaplarda ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 h-11 border-2 focus:border-orange-300 dark:focus:border-orange-700 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Toplam: <span className="font-semibold text-foreground">{books.length}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Filtrelenen: <span className="font-semibold text-foreground">{filteredBooks.length}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <Card className="border-2 border-red-200 dark:border-red-800">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Hata Oluştu</h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
              <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20">
                Yeniden Dene
              </Button>
            </CardContent>
          </Card>
        ) : filteredBooks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <Card 
                key={book.id} 
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 border-2 hover:border-orange-200 dark:hover:border-orange-800"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative pb-3">
                  <Link href={`/admin/book/${book.id}`} className="block">
                    <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                      {book.image ? (
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50">
                          <BookOpen className="h-16 w-16 text-orange-600 dark:text-orange-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-1">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardHeader>
                
                <CardContent className="relative pt-0">
                  <Link href={`/admin/book/${book.id}`} className="block">
                    <div className="space-y-2">
                      <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors line-clamp-2">
                        {book.title}
                      </CardTitle>
                      
                      {book.authorName && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span className="italic">by {book.authorName}</span>
                        </div>
                      )}

                      {book.publishedDate && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Yayın: {new Date(book.publishedDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          <span>Kitap</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Görüntüle
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-muted">
            <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {search ? "Kitap Bulunamadı" : "Henüz Kitap Yok"}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {search 
                    ? `"${search}" araması için kitap bulunamadı. Farklı bir arama terimi deneyin.`
                    : "Henüz hiç kitap eklenmemiş. İlk kitabınızı oluşturmak için aşağıdaki butona tıklayın."
                  }
                </p>
              </div>
              {!search && (
                <Button asChild className="gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/admin/book/create">
                    <Plus className="h-4 w-4" />
                    İlk Kitabını Oluştur
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default BookList

