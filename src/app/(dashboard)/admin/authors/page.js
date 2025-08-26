"use client"
import { useEffect, useState } from "react"
import HttpClient from "@/util/HttpClient"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Users, Eye, Edit } from "lucide-react"
import Image from "next/image"

const Page = () => {
  const router = useRouter()
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true)
        const res = await HttpClient.get("/authors")
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const data = await res.json()
        setAuthors(Array.isArray(data) ? data : data?.content || [])
      } catch (err) {
        console.error(err)
        setError("Yazarlar yüklenirken bir hata oluştu.")
      } finally {
        setLoading(false)
      }
    }
    fetchAuthors()
  }, [])

  const handleAuthorClick = (authorId) => {
    router.push(`/admin/authors/${authorId}`)
  }

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(search.toLowerCase())
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
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Yazar Yönetimi
            </h1>
            <p className="text-lg text-muted-foreground">
              Platformdakı yazarları idarə edin və yenilərini əlavə edin
            </p>
          </div>
          <Button asChild className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/admin/authors/create">
              <Plus className="h-4 w-4" />
              Yeni Yazar
            </Link>
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Yazarlarda ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 h-11 border-2 focus:border-blue-300 dark:focus:border-blue-700 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Toplam: <span className="font-semibold text-foreground">{authors.length}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Filtrelenen: <span className="font-semibold text-foreground">{filteredAuthors.length}</span></span>
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
                <Users className="h-8 w-8 text-red-600 dark:text-red-400" />
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
        ) : filteredAuthors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAuthors.map((author) => (
              <Card 
                key={author.id} 
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer"
                onClick={() => handleAuthorClick(author.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative pb-3">
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                    {author.image ? (
                      <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50">
                        <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
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
                </CardHeader>
                
                <CardContent className="relative pt-0">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {author.name}
                    </CardTitle>
                    {author.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {author.bio}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>Yazar</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAuthorClick(author.id)
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Görüntüle
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-muted">
            <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {search ? "Yazar Bulunamadı" : "Henüz Yazar Yok"}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {search 
                    ? `"${search}" araması için yazar bulunamadı. Farklı bir arama terimi deneyin.`
                    : "Henüz hiç yazar eklenmemiş. İlk yazarınızı oluşturmak için aşağıdaki butona tıklayın."
                  }
                </p>
              </div>
              {!search && (
                <Button asChild className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/admin/authors/create">
                    <Plus className="h-4 w-4" />
                    İlk Yazarını Oluştur
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

export default Page

