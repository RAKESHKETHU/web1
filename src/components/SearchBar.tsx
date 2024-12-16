import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question..."
          className="w-full px-4 py-3 pl-12 text-lg rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          disabled={isSearching}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <button
          type="submit"
          disabled={!query.trim() || isSearching}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}