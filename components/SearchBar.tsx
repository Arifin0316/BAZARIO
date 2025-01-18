'use client';

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      const params = new URLSearchParams();
      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      }
      const newUrl = `/prodak${params.toString() ? `?${params.toString()}` : ''}`;
      router.push(newUrl);
    }
  }, [debouncedSearch, router]);

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}