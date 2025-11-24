"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VideoPageHeader from "./VideoPageHeader";
import ModernSearchAndToggle from "./ModernSearchAndToggle";
import VideosGrid from "./VideosGridClient";
import PlaylistsGrid from "./PlaylistsGridClient";

export default function VideosClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [content, setContent] = useState(searchParams.get("content") || "videos");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  useEffect(() => {
    const params = new URLSearchParams();
    if (content) params.set("content", content);
    if (search) params.set("search", search);
    if (page > 1) params.set("page", page.toString());

    const newUrl = params.toString() ? `?${params.toString()}` : "/videos";
    router.replace(newUrl, { scroll: false });
  }, [content, search, page, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <VideoPageHeader />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <ModernSearchAndToggle
              content={content}
              search={search}
              onContentChange={setContent}
              onSearchChange={(newSearch) => {
                setSearch(newSearch);
                setPage(1);
              }}
            />
          </div>

          <div className="space-y-8">
            {content === "playlists" && (
              <PlaylistsGrid search={search} />
            )}
            {(content === "videos" || content === "shorts") && (
              <VideosGrid
                content={content}
                search={search}
                page={page}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
