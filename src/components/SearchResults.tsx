import React from 'react';
import { SearchResult } from '../types';
import { ExternalLink } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
}

export function SearchResults({ results, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="w-full max-w-3xl mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mt-8 space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {result.title}
          </h3>
          <p className="text-gray-600 mb-3">{result.snippet}</p>
          <div className="flex items-center gap-2 text-sm">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <ExternalLink size={14} />
              {result.url}
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              Relevance: {(result.relevanceScore * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}