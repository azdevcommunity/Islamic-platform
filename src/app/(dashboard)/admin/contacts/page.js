"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Phone, User, Calendar, MessageSquare, Eye, Save, CheckCircle2 } from "lucide-react"
import HttpClient from "@/util/HttpClient"

const ContactUsTable = () => {
  const [contacts, setContacts] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState(10)
  const [selectedMessage, setSelectedMessage] = useState("")
  const [selectedContact, setSelectedContact] = useState(null)
  const [updatedContacts, setUpdatedContacts] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const fetchContacts = async (page = 0, size = 10) => {
    setLoading(true)
    setError(null)
    try {
      const response = await HttpClient.get(`/contact?page=${page}&size=${size}`)
      if (!response.ok) throw new Error(`Error: ${response.status}`)
      const data = await response.json()

      const updatedData = data.content.map((contact) => ({
        ...contact,
        read: contact.read || false,
      }))

      setContacts(updatedData)
      setTotalRecords(data.totalElements)
    } catch (error) {
      console.error("Error fetching contacts:", error)
      setError("İletişim mesajları yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts(page, rows)
  }, [page, rows])

  const onReadChange = (contact, checked) => {
    const updatedContact = { ...contact, read: checked }
    const updatedList = contacts.map((item) => (item.id === contact.id ? updatedContact : item))
    setContacts(updatedList)

    if (!updatedContacts.some((c) => c.id === updatedContact.id)) {
      setUpdatedContacts([...updatedContacts, updatedContact])
    } else {
      setUpdatedContacts(updatedContacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)))
    }
  }

  const saveChanges = async () => {
    setSaving(true)
    try {
      await HttpClient.put(
        "/contact/update-batch",
        updatedContacts.map((u) => u.id),
      )
      setUpdatedContacts([])
      fetchContacts(page, rows)
    } catch (error) {
      console.error("Error saving changes:", error)
      setError("Değişiklikler kaydedilirken bir hata oluştu.")
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-16 bg-muted rounded-lg" />
        </div>
      ))}
    </div>
  )

  if (contacts.length === 0 && !loading && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 transition-colors duration-300">
        <Card className="border-2 border-dashed border-muted">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
              <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Henüz Mesaj Yok</h3>
              <p className="text-muted-foreground">
                Henüz hiç iletişim mesajı alınmamış.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              İletişim Mesajları
            </h1>
            <p className="text-lg text-muted-foreground">
              Kullanıcılardan gelen iletişim mesajlarını yönetin
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Toplam: <span className="font-semibold text-foreground">{totalRecords}</span></span>
            </div>
            {updatedContacts.length > 0 && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {updatedContacts.length} değişiklik
              </Badge>
            )}
          </div>
        </div>

        {/* Save Changes Button */}
        {updatedContacts.length > 0 && (
          <div className="flex justify-end">
            <Button 
              onClick={saveChanges}
              disabled={saving}
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Değişiklikleri Kaydet
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <MessageSquare className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Content */}
      <Card className="border-2 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            İletişim Mesajları
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad</TableHead>
                    <TableHead>E-posta</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Konu</TableHead>
                    <TableHead>Mesaj</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Okundu</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id} className={contact.read ? "opacity-60" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {contact.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {contact.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {contact.phone || "—"}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {contact.subject}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <span className="line-clamp-2 text-sm text-muted-foreground">
                          {contact.message.length > 100 
                            ? `${contact.message.substring(0, 100)}...` 
                            : contact.message
                          }
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(contact.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`read-${contact.id}`}
                            checked={contact.read}
                            onCheckedChange={(checked) => onReadChange(contact, checked)}
                          />
                          <label
                            htmlFor={`read-${contact.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {contact.read ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Okundu
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Okunmadı
                              </Badge>
                            )}
                          </label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedMessage(contact.message)
                                setSelectedContact(contact)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Mesaj Detayları
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Ad</label>
                                  <p className="font-medium">{selectedContact?.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">E-posta</label>
                                  <p className="font-medium">{selectedContact?.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                                  <p className="font-medium">{selectedContact?.phone || "—"}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Tarih</label>
                                  <p className="font-medium">{selectedContact && formatDate(selectedContact.createdAt)}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Konu</label>
                                <p className="font-medium">{selectedContact?.subject}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Mesaj</label>
                                <div className="mt-2 p-4 bg-muted rounded-lg">
                                  <p className="whitespace-pre-wrap">{selectedMessage}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination would go here if needed */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>
                  Sayfa {page + 1} / {Math.ceil(totalRecords / rows)} - Toplam {totalRecords} mesaj
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                  >
                    Önceki
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={(page + 1) * rows >= totalRecords}
                    onClick={() => setPage(page + 1)}
                  >
                    Sonraki
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactUsTable

