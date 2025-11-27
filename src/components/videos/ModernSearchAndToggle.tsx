"use client";

import { useRouter } from "next/navigation";
import { FaList, FaVideo, FaPlay } from "react-icons/fa";
import ModernSearchComponent from "./ModernSearchComponent";

interface ModernSearchAndToggleProps {
  content: string;
  search: string;
}

const ModernSearchAndToggle = ({
  content,
  search,
}: ModernSearchAndToggleProps) => {
  const router = useRouter();

  const handleContentChange = (newContent: string) => {
    const params = new URLSearchParams();
    params.set("content", newContent);
    if (search) params.set("search", search);
    params.set("page", "1");
    router.push(`/videos?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (newSearch: string) => {
    const params = new URLSearchParams();
    params.set("content", content);
    if (newSearch) params.set("search", newSearch);
    params.set("page", "1");
    router.push(`/videos?${params.toString()}`, { scroll: false });
  };
  const toggleButtons = [
    { label: "Playlistlər", value: "playlists", icon: FaList, color: "red" },
    { label: "Videolar", value: "videos", icon: FaVideo, color: "red" },
    { label: "Shortlar", value: "shorts", icon: FaPlay, color: "red" },
  ];

  return (
    <div
      id="content"
      className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Video Kolleksiyası
            </h2>
            <p className="text-gray-600">
              İstədiyiniz kateqoriyadan videolar və playlistləri seçin
            </p>
          </div>

          <div
            className="flex flex-wrap gap-3"
            role="group"
            aria-label="Content Type Toggle"
          >
            {toggleButtons.map((btn) => {
              const isActive = content === btn.value;
              const IconComponent = btn.icon;

              return (
                <button
                  key={btn.value}
                  onClick={() => handleContentChange(btn.value)}
                  className={`
                    group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    ${
                      isActive
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }
                  `}
                  aria-pressed={isActive}
                >
                  <IconComponent
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`}
                  />
                  <span>{btn.label}</span>

                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <label
            htmlFor="videos-search"
            className="text-sm font-medium text-gray-700"
          >
            Axtarış
          </label>
          <ModernSearchComponent
            initialSearchValue={search}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernSearchAndToggle;
