"use client"

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TagForm from "@/components/admin/tags/TagForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import HttpClient from "@/util/HttpClient";

export default function EditTagPage() {
  const params = useParams();
  const { id } = params;
  const [tagData, setTagData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await HttpClient.get(`/tags/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setTagData(data);
      } catch (err) {
        console.error(err);
        setError("Etiket yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchTag();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="h-10 bg-muted rounded-lg w-48 animate-pulse" />
            <div className="space-y-2">
              <div className="h-12 bg-muted rounded-lg w-80 animate-pulse" />
              <div className="h-6 bg-muted rounded-lg w-64 animate-pulse" />
            </div>
          </div>
          
          <Card className="border-2 shadow-xl">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 bg-muted rounded w-32 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-48 animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-lg">Etiket yükleniyor...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="border-2 border-red-200 dark:border-red-800">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-xl text-red-900 dark:text-red-100">Hata Oluştu</CardTitle>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yeniden Dene
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <TagForm initialData={tagData} isEdit={true} />;
} 