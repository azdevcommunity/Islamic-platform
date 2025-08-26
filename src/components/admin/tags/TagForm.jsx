"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, X, Hash, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import HttpClient from "@/util/HttpClient";

export default function TagForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const hasChanges = isEdit
    ? (name.trim() !== (initialData?.name || "") || description.trim() !== (initialData?.description || ""))
    : true;
  const isFormValid = name.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || null
      };

      const res = isEdit
        ? await HttpClient.put(`/tags/${initialData.id}`, payload)
        : await HttpClient.post("/tags", payload);

      // Check if response is ok (status 200-299)
      if (!res.ok) {
        let errorMessage = `HTTP Error: ${res.status}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If we can't parse the error response, use the status
          console.warn("Could not parse error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/tags");
      }, 1500);
    } catch (err) {
      console.error("TagForm error:", err);
      const errorMessage = err?.message || "Bilinmeyen bir hata oluştu";
      setError(
        isEdit
          ? `Etiket güncellenirken bir hata oluştu: ${errorMessage}`
          : `Etiket oluşturulurken bir hata oluştu: ${errorMessage}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/admin/tags">
              <ArrowLeft className="h-4 w-4" />
              Etiketlere Geri Dön
            </Link>
          </Button>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                {isEdit ? "Etiket Düzenle" : "Yeni Etiket Oluştur"}
              </h1>
              {isEdit && initialData?.id && (
                <Badge variant="outline" className="text-sm font-medium bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700">
                  ID: {initialData.id}
                </Badge>
              )}
            </div>
            <p className="text-lg text-muted-foreground">
              {isEdit ? "Etiket bilgilerini güncelleyin" : "Platformunuz için yeni bir etiket oluşturun"}
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {isEdit
                ? "Etiket başarıyla güncellendi! Etiketler sayfasına yönlendiriliyorsunuz..."
                : "Etiket başarıyla oluşturuldu! Etiketler sayfasına yönlendiriliyorsunuz..."
              }
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

        {/* Form Card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-800">
                <Hash className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-2xl">Etiket Bilgileri</CardTitle>
                <CardDescription className="text-base">
                  Etiket adı ve açıklamasını {isEdit ? "güncelleyin" : "girin"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tag Name */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Etiket Adı *
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: İslam Tarihi, Fıkıh, Hadis..."
                  className="h-12 text-base border-2 focus:border-purple-300 dark:focus:border-purple-700 transition-colors"
                  required
                  disabled={loading || success}
                />
                <p className="text-sm text-muted-foreground">
                  Etiket adı benzersiz olmalı ve içerik kategorisini açık bir şekilde tanımlamalıdır.
                </p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Bu etiketin ne için kullanıldığını açıklayın... (İsteğe bağlı)"
                  className="min-h-[120px] text-base border-2 focus:border-purple-300 dark:focus:border-purple-700 transition-colors resize-none"
                  disabled={loading || success}
                />
                <p className="text-sm text-muted-foreground">
                  Etiketin hangi tür içerikler için kullanılacağını açıklayın. Bu, editörlerin doğru etiketi seçmesine yardımcı olur.
                </p>
              </div>

              {/* Preview */}
              {name.trim() && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Önizleme</Label>
                  <div className="p-4 rounded-xl border-2 border-dashed border-muted bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-800">
                        <Hash className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{name}</h4>
                        {description && (
                          <p className="text-sm text-muted-foreground mt-1">{description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Changes Indicator for Edit Mode */}
              {isEdit && hasChanges && (
                <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    Kaydedilmemiş değişiklikleriniz var. Değişiklikleri kaydetmek için "{isEdit ? 'Güncelle' : 'Oluştur'}" butonuna tıklayın.
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading || !isFormValid || (isEdit && !hasChanges) || success}
                  className="flex-1 h-12 gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isEdit ? "Güncelleniyor..." : "Oluşturuluyor..."}
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      {isEdit ? "Güncellendi!" : "Oluşturuldu!"}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {isEdit ? "Güncelle" : "Etiketi Oluştur"}
                    </>
                  )}
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-12 gap-2 border-2 hover:bg-muted/50 transition-colors"
                  disabled={loading || success}
                >
                  <Link href="/admin/tags">
                    <X className="h-4 w-4" />
                    İptal
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 mt-1">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                  {isEdit ? "Düzenleme İpuçları" : "İpuçları"}
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  {isEdit ? (
                    <>
                      <li>• Etiket adını değiştirirken mevcut içerikleri etkileyebileceğini unutmayın</li>
                      <li>• Açıklama alanı editörlerin doğru etiketi seçmesine yardımcı olur</li>
                      <li>• Değişiklikler anında tüm platformda geçerli olacaktır</li>
                      <li>• Etiket silinmek isteniyorsa önce kullanıldığı yerlerden kaldırılmalıdır</li>
                    </>
                  ) : (
                    <>
                      <li>• Etiket adları kısa ve açıklayıcı olmalıdır</li>
                      <li>• Benzer etiketler oluşturmaktan kaçının</li>
                      <li>• Açıklama alanı editörlerin doğru etiketi seçmesine yardımcı olur</li>
                      <li>• Etiketler daha sonra düzenlenebilir</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}