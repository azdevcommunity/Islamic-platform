"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, Tag, Filter, MoreHorizontal, Eye, Hash, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import HttpClient from "@/util/HttpClient";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'


  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const res = await HttpClient.get("/tags");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.content || [];
        setTags(list);
      } catch (err) {
        console.error(err);
        setError("Etiketler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  const handleDeleteTag = async (tagId) => {
    if (!confirm("Bu etiketi silmek istediğinizden emin misiniz?")) return;
    
    try {
      const res = await HttpClient.delete(`/tags/${tagId}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      setTags(tags.filter(tag => tag.id !== tagId));
    } catch (err) {
      console.error(err);
      alert("Etiket silinirken bir hata oluştu.");
    }
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(search.toLowerCase()) ||
    (tag.description && tag.description.toLowerCase().includes(search.toLowerCase()))
  );

  const TagCard = ({ tag }) => (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 border-2 hover:border-purple-200 dark:hover:border-purple-800">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-800 group-hover:scale-110 transition-transform duration-300">
              <Hash className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                {tag.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs font-medium bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700">
                ID: {tag.id}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={`/admin/tags/${tag.id}/edit`} className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Düzenle
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Detayları Gör
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleDeleteTag(tag.id)}
                className="flex items-center gap-2 text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="relative pt-0">
        <CardDescription className="text-sm text-muted-foreground mb-4 min-h-[2.5rem] line-clamp-2">
          {tag.description || "Bu etiket için açıklama eklenmemiş."}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            <span>Etiket</span>
          </div>
          <div className="flex gap-1">
            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/admin/tags/${tag.id}/edit`}>
                <Edit className="h-3 w-3 mr-1" />
                Düzenle
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LoadingSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-3 bg-muted rounded w-16" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Etiket Yönetimi
            </h1>
            <p className="text-lg text-muted-foreground">
              Platformdakı etiketləri idarə edin və yenilərini əlavə edin
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="gap-2"
              >
                <Grid3X3 className="h-4 w-4" />
                Kart
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                Tablo
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrele
            </Button>
            <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/admin/tags/new">
                <Plus className="h-4 w-4" />
                Yeni Etiket
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Etiketlerde ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 h-11 border-2 focus:border-purple-300 dark:focus:border-purple-700 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>Toplam: <span className="font-semibold text-foreground">{tags.length}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Filtrelenen: <span className="font-semibold text-foreground">{filteredTags.length}</span></span>
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
                <Tag className="h-8 w-8 text-red-600 dark:text-red-400" />
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
        ) : filteredTags.length > 0 ? (
          <>
            {viewMode === 'card' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTags.map(tag => (
                  <TagCard key={tag.id} tag={tag} />
                ))}
              </div>
            ) : (
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Etiketler Tablosu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">ID</TableHead>
                          <TableHead>Etiket Adı</TableHead>
                          <TableHead>Açıklama</TableHead>
                          <TableHead className="w-32 text-right">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTags.map((tag) => (
                          <TableRow key={tag.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <TableCell className="font-medium">
                              <Badge variant="outline" className="text-xs font-medium bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700">
                                {tag.id}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-800">
                                  <Hash className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                </div>
                                <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                  {tag.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground line-clamp-2">
                                {tag.description || "Bu etiket için açıklama eklenmemiş."}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-2">
                                <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Link href={`/admin/tags/${tag.id}/edit`}>
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteTag(tag.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 opacity-0 group-hover:opacity-100 transition-opacity"
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
        ) : (
          <Card className="border-2 border-dashed border-muted">
            <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                <Tag className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {search ? "Etiket Bulunamadı" : "Henüz Etiket Yok"}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {search 
                    ? `"${search}" araması için etiket bulunamadı. Farklı bir arama terimi deneyin.`
                    : "Henüz hiç etiket eklenmemiş. İlk etiketinizi oluşturmak için aşağıdaki butona tıklayın."
                  }
                </p>
              </div>
              {!search && (
                <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/admin/tags/new">
                    <Plus className="h-4 w-4" />
                    İlk Etiketini Oluştur
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

