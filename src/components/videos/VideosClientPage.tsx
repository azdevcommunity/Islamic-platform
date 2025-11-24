"use client";

import { useState } from "react";
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
  const [content, setContent] = useState(initialContent);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);

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
              }}
              onSearchChange={(newSearch) => {
                setSearch(newSearch);
                setPage(1);
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
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
