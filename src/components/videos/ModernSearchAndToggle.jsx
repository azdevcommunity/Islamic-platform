import Link from "next/link";
import ModernSearchComponent from "./ModernSearchComponent";
import { FaList, FaVideo, FaPlay } from "react-icons/fa";

const ModernSearchAndToggle = ({ playlistId, search, videoId, content }) => {
    // Function to create href for toggle links, preserving relevant params
    const createToggleHref = (newContentValue) => {
        const currentParams = new URLSearchParams();

        // Preserve existing relevant IDs or search terms
        if (playlistId != null) currentParams.set("playlistId", playlistId);
        if (videoId != null) currentParams.set("videoId", videoId);
        if (search != null) currentParams.set("search", search);

        // Set the new content value
        currentParams.set("content", newContentValue.trim());

        // Reset page number when toggling content type
        currentParams.delete("page");

        return `?${currentParams.toString()}`;
    };

    // Toggle button definitions with icons
    const toggleButtons = [
        { label: "Playlistlər", value: "playlists", icon: FaList, color: "red" },
        { label: "Videolar", value: "videos", icon: FaVideo, color: "red" },
        { label: "Shortlar", value: "shorts", icon: FaPlay, color: "red" },
    ];

    const currentContent = content || "videos";

    return (
        <div id="content" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left Section: Title and Toggle Buttons */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Video Kolleksiyası
                        </h2>
                        <p className="text-gray-600">
                            İstədiyiniz kateqoriyadan videolar və playlistləri seçin
                        </p>
                    </div>

                    {/* Toggle Buttons Group */}
                    <div className="flex flex-wrap gap-3" role="group" aria-label="Content Type Toggle">
                        {toggleButtons.map((btn) => {
                            const isActive = currentContent === btn.value;
                            const IconComponent = btn.icon;
                            
                            return (
                                <Link
                                    key={btn.value}
                                    scroll={false}
                                    href={createToggleHref(btn.value)}
                                    className={`
                                        group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                        ${isActive
                                            ? `bg-gradient-to-r  from-red-500 to-red-600
                                     text-white shadow-lg shadow-${btn.color}-500/25`
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                                        }
                                    `}
                                    aria-pressed={isActive}
                                >
                                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                    <span>{btn.label}</span>
                                    
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right Section: Search */}
                <div className="flex flex-col items-end space-y-2">
                    <label htmlFor="videos-search" className="text-sm font-medium text-gray-700">
                        Axtarış
                    </label>
                    <ModernSearchComponent initialSearchValue={search} />
                </div>
            </div>
        </div>
    );
};

export default ModernSearchAndToggle;
