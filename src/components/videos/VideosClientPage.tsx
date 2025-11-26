"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VideoPageHeader from "./VideoPageHeader";
import ModernSearchAndToggle from "./ModernSearchAndToggle";
import VideosGrid from "./VideosGridClient";
import PlaylistsGrid from "./PlaylistsGridClient";

interface VideosClientPageProps {
  initialContent: string;
  initialSearch: string;
  initialPage: number;
}

export default function VideosClientPage({
  initialContent,
  initialSearch,
  initialPage,
}: VideosClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [content, setContent] = useState(initialContent);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);

  // Sayfa və axtarış dəyişdikdə yukarı scroll (tab dəyişdikdə yox)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [ search]);

  // URL-i yeniləmək üçün helper funksiya
  const updateURL = (newContent: string, newSearch: string, newPage: number) => {
    const params = new URLSearchParams();
    params.set("content", newContent);
    if (newSearch) params.set("search", newSearch);
    if (newPage > 1) params.set("page", newPage.toString());
    
    router.push(`/videos?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <VideoPageHeader />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <ModernSearchAndToggle
              content={content}
              search={search}
              onContentChange={(newContent) => {
                setContent(newContent);
                setPage(1);
                updateURL(newContent, search, 1);
              }}
              onSearchChange={(newSearch) => {
                setSearch(newSearch);
                setPage(1);
                updateURL(content, newSearch, 1);
              }}
            />
          </div>

          <div className="space-y-8">
            {content === "playlists" && <PlaylistsGrid search={search} />}
            {(content === "videos" || content === "shorts") && (
              <VideosGrid
                content={content}
                search={search}
                page={page}
                onPageChange={(newPage) => {
                  setPage(newPage);
                  updateURL(content, search, newPage);
                }}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
