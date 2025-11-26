"use client";

import { useState } from "react";
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

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setPage(1);
    
    const params = new URLSearchParams();
    params.set("content", newContent);
    if (search) params.set("search", search);
    params.set("page", "1");
    
    router.push(`/videos?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
    
    const params = new URLSearchParams();
    params.set("content", content);
    if (newSearch) params.set("search", newSearch);
    params.set("page", "1");
    
    router.push(`/videos?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    
    const params = new URLSearchParams();
    params.set("content", content);
    if (search) params.set("search", search);
    params.set("page", newPage.toString());
    
    router.push(`/videos?${params.toString()}`);
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
              onContentChange={handleContentChange}
              onSearchChange={handleSearchChange}
            />
          </div>

          <div className="space-y-8">
            {content === "playlists" && <PlaylistsGrid search={search} />}
            {(content === "videos" || content === "shorts") && (
              <VideosGrid
                content={content}
                search={search}
                page={page}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
