import { useState, useCallback } from 'react';
import { SearchResult } from '../types';
import { searchDocuments } from '../services/searchService';

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    setIsSearching(true);
    setError(null);
    
    try {
      const searchResults = await searchDocuments(query);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return {
    results,
    isSearching,
    error,
    search,
  };
}