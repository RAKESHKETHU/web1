import React, { useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { UrlInput } from './components/UrlInput';
import { SearchResults } from './components/SearchResults';
import { Database, Brain } from 'lucide-react';
import { useSearch } from './hooks/useSearch';
import type { CrawlStatus } from './types';
import { useState } from 'react';

export default function App() {
  const { results, isSearching, error, search } = useSearch();
  const [crawlStatuses, setCrawlStatuses] = useState<CrawlStatus[]>([]);

  const handleUrlSubmit = useCallback((url: string) => {
    const newStatus: CrawlStatus = {
      url,
      status: 'processing',
      timestamp: new Date().toISOString(),
    };
    
    setCrawlStatuses(prev => [newStatus, ...prev]);
    
    setTimeout(() => {
      setCrawlStatuses(prev =>
        prev.map(status =>
          status.url === url
            ? { 
                ...status, 
                status: Math.random() > 0.1 ? 'completed' : 'error'
              }
            : status
        )
      );
    }, 2000 + Math.random() * 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Intelligent Search System
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powered by advanced web crawling, vector embeddings, and natural language processing
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="w-full max-w-3xl">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
              <Database className="text-blue-600" />
              Data Ingestion
            </div>
            <UrlInput
              onUrlSubmit={handleUrlSubmit}
              crawlStatuses={crawlStatuses}
            />
          </div>

          <div className="w-full max-w-3xl">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
              <Brain className="text-blue-600" />
              Semantic Search
            </div>
            <SearchBar onSearch={search} isSearching={isSearching} />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <SearchResults
              results={results}
              loading={isSearching}
            />
          </div>
        </div>
      </div>
    </div>
  );
}