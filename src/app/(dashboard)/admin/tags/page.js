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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 border border-gray-200 hover:border-emerald-300">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 border border-emerald-200 group-hover:scale-110 transition-transform duration-300">
              <Hash className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                {tag.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs font-medium bg-emerald-50 text-emerald-700 border-emerald-200">
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
            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-50 hover:text-emerald-700">
              <Link href={`/admin/tags/${tag.id}/edit`}>
                <Edit className="h-3 w-3 mr-1" />
                Düzənlə
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-emerald-500/10" />
        <div className="relative z-10 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-0.5 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                    <Tag className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-20 blur-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Teq İdarəsi
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Platformdakı teqləri idarə edin və yenilərini əlavə edin
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'card' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('card')}
                  className={`gap-2 ${viewMode === 'card' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                  Kart
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className={`gap-2 ${viewMode === 'table' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'}`}
                >
                  <List className="h-4 w-4" />
                  Tablo
                </Button>
              </div>
              
              <Button variant="outline" size="sm" className="gap-2 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300">
                <Filter className="h-4 w-4" />
                Filtrələ
              </Button>
              <Button asChild className="gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/admin/tags/new">
                  <Plus className="h-4 w-4" />
                  Yeni Teq
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Teqlərdə axtar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-11 border-2 focus:border-emerald-300 transition-colors"
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>Ümumi: <span className="font-semibold text-foreground">{tags.length}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Filtrlənmiş: <span className="font-semibold text-foreground">{filteredTags.length}</span></span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <Card className="border-2 border-red-200">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <Tag className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-red-900">Xəta Baş Verdi</h3>
                <p className="text-red-700">{error}</p>
              </div>
              <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                Yenidən Cəhd Et
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
              <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Tag className="h-5 w-5" />
                    Teqlər Cədvəli
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">ID</TableHead>
                          <TableHead>Teq Adı</TableHead>
                          <TableHead>Açıqlama</TableHead>
                          <TableHead className="w-32 text-right">Əməliyyatlar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTags.map((tag) => (
                          <TableRow key={tag.id} className="group hover:bg-emerald-50/50 transition-colors">
                            <TableCell className="font-medium">
                              <Badge variant="outline" className="text-xs font-medium bg-emerald-50 text-emerald-700 border-emerald-200">
                                {tag.id}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 border border-emerald-200">
                                  <Hash className="h-3 w-3 text-emerald-600" />
                                </div>
                                <span className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                  {tag.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground line-clamp-2">
                                {tag.description || "Bu teq üçün açıqlama əlavə edilməyib."}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-2">
                                <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-50 hover:text-emerald-700">
                                  <Link href={`/admin/tags/${tag.id}/edit`}>
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteTag(tag.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <Tag className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {search ? "Teq Tapılmadı" : "Hələ Teq Yoxdur"}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {search 
                    ? `"${search}" axtarışı üçün teq tapılmadı. Fərqli bir axtarış termini sınayın.`
                    : "Hələ heç teq əlavə edilməyib. İlk teqinizi yaratmaq üçün aşağıdakı düyməni basın."
                  }
                </p>
              </div>
              {!search && (
                <Button asChild className="gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/admin/tags/new">
                    <Plus className="h-4 w-4" />
                    İlk Teqini Yarat
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

