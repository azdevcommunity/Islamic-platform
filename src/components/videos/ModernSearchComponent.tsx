"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface ModernSearchComponentProps {
  initialSearchValue: string;
  onSearchChange: (search: string) => void;
}

const ModernSearchComponent = ({
  initialSearchValue,
  onSearchChange,
}: ModernSearchComponentProps) => {
  const [searchValue, setSearchValue] = useState(initialSearchValue || "");

  useEffect(() => {
    setSearchValue(initialSearchValue || "");
  }, [initialSearchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearchChange("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchValue.trim();
    onSearchChange(trimmedSearch);
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
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Axtarışı təmizlə"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

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
