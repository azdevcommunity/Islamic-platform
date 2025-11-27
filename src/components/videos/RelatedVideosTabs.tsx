"use client";

import { useState, useEffect } from "react";

interface RelatedVideosTabsProps {
  videosCount: number;
  playlistsCount: number;
}

export default function RelatedVideosTabs({
  videosCount,
  playlistsCount,
}: RelatedVideosTabsProps) {
  const [activeTab, setActiveTab] = useState<"videos" | "playlists">("videos");

  useEffect(() => {
    // Show/hide content based on active tab
    const videoContent = document.querySelector('[data-tab="videos"]');
    const playlistContent = document.querySelector('[data-tab="playlists"]');
    const viewAllLink = document.querySelector("#view-all-link a");

    if (activeTab === "videos") {
      videoContent?.classList.remove("hidden");
      playlistContent?.classList.add("hidden");
      if (viewAllLink) {
        viewAllLink.setAttribute("href", "/videos?content=videos");
        viewAllLink.innerHTML = `
          Bütün Videolar
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        `;
      }
    } else {
      videoContent?.classList.add("hidden");
      playlistContent?.classList.remove("hidden");
      if (viewAllLink) {
        viewAllLink.setAttribute("href", "/videos?content=playlists");
        viewAllLink.innerHTML = `
          Bütün Playlistlər
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        `;
      }
    }
  }, [activeTab]);

  return (
    <div className="flex gap-4 border-b border-gray-200">
      <button
        onClick={() => setActiveTab("videos")}
        className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
          activeTab === "videos"
            ? "border-red-500 text-red-600"
            : "border-transparent text-gray-600 hover:text-gray-900"
        }`}
      >
        Videolar ({videosCount})
      </button>
      <button
        onClick={() => setActiveTab("playlists")}
        className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
          activeTab === "playlists"
            ? "border-red-500 text-red-600"
            : "border-transparent text-gray-600 hover:text-gray-900"
        }`}
      >
        Playlistlər ({playlistsCount})
      </button>
    </div>
  );
}
