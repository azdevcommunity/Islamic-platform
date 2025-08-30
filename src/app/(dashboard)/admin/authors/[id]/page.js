"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Trash2, Upload, X, User, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { BASE_URL } from "@/util/Const"
import HttpClient from "@/util/HttpClient"

const AuthorDetail = () => {
  const router = useRouter()
  const { id } = useParams()

  const [author, setAuthor] = useState(null)
  const [formData, setFormData] = useState({ name: "", image: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true)
        const res = await HttpClient.get(`/authors/${id}`)
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const data = await res.json()

        setAuthor(data)
        setFormData({ name: data.name || "", image: data.image || "" })
      } catch (err) {
        console.error("Error fetching author:", err)
        setError("Yazar bilgileri yüklenirken bir hata oluştu.")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchAuthor()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Görsel boyutu 5MB'dan küçük olmalıdır.")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const res = await fetch(`${BASE_URL}/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name.trim(), image: formData.image }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Yazar güncellenirken bir hata oluştu.")
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Bu yazarı silmek istediğinizden emin misiniz?")) return

    setSaving(true)
    try {
      const res = await HttpClient.delete(`/authors/${id}`)
      if (res.status === 204 || res.ok) {
        router.push("/admin/authors")
      } else {
        const data = await res.json()
        throw new Error(data.message || "Yazar silinirken bir hata oluştu.")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="h-10 bg-muted rounded-lg w-48 animate-pulse" />
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error && !author) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="border-2 border-red-200 dark:border-red-800">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <User className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Hata Oluştu</h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/admin/authors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Yazarlara Geri Dön
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/admin/authors">
              <ArrowLeft className="h-4 w-4" />
              Yazarlara Geri Dön
            </Link>
          </Button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Yazar Düzenle
            </h1>
            <p className="text-muted-foreground mt-2">
              Yazar bilgilerini düzenleyin
            </p>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Yazar bilgileri başarıyla güncellendi!
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Yazar Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Yazar Fotoğrafı</Label>

                {formData.image ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={formData.image}
                      alt={formData.name}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Fotoğraf yüklemek için tıklayın</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload').click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {formData.image ? "Fotoğrafı Değiştir" : "Fotoğraf Seç"}
                </Button>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Ad Soyad *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Yazarın tam adını girin"
                  className="h-12 text-base"
                  required
                  disabled={saving}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={saving || !formData.name.trim()}
                  className="flex-1 h-12 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Güncelleniyor...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Güncelle
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={saving}
                  className="h-12 gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Sil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthorDetail