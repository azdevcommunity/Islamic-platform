// components/videos/ModernSearchComponent.jsx (or wherever you place it)
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react"; // Import icons

const ModernSearchComponent = ({ initialSearchValue }) => {
    // Use initialSearchValue to sync with URL on load
    const [searchValue, setSearchValue] = useState(initialSearchValue ?? "");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Update state if initialSearchValue changes (e.g., browser back/forward)
    useEffect(() => {
        setSearchValue(initialSearchValue ?? "");
    }, [initialSearchValue]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const clearSearch = (updateUrl = true) => {
        setSearchValue("");
        if (updateUrl) {
            const currentParams = new URLSearchParams(searchParams);
            currentParams.delete("search");
            // Also reset page number if pagination exists
            currentParams.delete("page"); // Assuming page param is 'page'
            const path = `?${currentParams.toString()}`;
            router.push(path, { scroll: false });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedSearch = searchValue.trim();
        const currentParams = new URLSearchParams(searchParams);

        if (trimmedSearch) {
            currentParams.set("search", trimmedSearch);
        } else {
            // If submitting an empty search, remove the parameter
            currentParams.delete("search");
        }
        // Reset page number on new search
        currentParams.delete("page"); // Assuming page param is 'page'

        const path = `?${currentParams.toString()}`;
        router.push(path, { scroll: false });
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full md:w-80 lg:w-96">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    name="search"
                    id="videos-search"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder="Video və ya playlist axtarın..."
                    className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-gray-900 placeholder:text-gray-500 focus:border-[#43b365] focus:outline-none focus:ring-2 focus:ring-[#43b365]/20 shadow-sm hover:shadow-md transition-all duration-200"
                />
                {/* Clear button */}
                {searchValue && (
                    <button
                        type="button"
                        onClick={() => clearSearch(true)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Axtarışı təmizlə"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                )}
            </div>
            
            {/* Search button for mobile */}
            <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#43b365] text-white p-2 rounded-lg hover:bg-[#2d7a47] transition-colors duration-200 md:hidden"
                aria-label="Axtarış et"
            >
                <Search className="h-4 w-4" />
            </button>
        </form>
    );
};

export default ModernSearchComponent;
