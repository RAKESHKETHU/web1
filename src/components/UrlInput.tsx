import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CrawlStatus } from '../types';
import { UrlStatusItem } from './UrlStatusItem';
import { isValidUrl, normalizeUrl } from '../utils/validation';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  crawlStatuses: CrawlStatus[];
}

export function UrlInput({ onUrlSubmit, crawlStatuses }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    const normalizedUrl = normalizeUrl(trimmedUrl);
    if (crawlStatuses.some(status => status.url === normalizedUrl)) {
      setError('This URL has already been added');
      return;
    }

    onUrlSubmit(normalizedUrl);
    setUrl('');
  };

  return (
    <div className="w-full max-w-3xl space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="Enter website URL to crawl..."
            className={`flex-1 px-4 py-2 rounded-lg border ${
              error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:ring-2 ${
              error ? 'focus:ring-red-200' : 'focus:ring-blue-200'
            }`}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!url.trim()}
          >
            <Plus size={20} />
            Add URL
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600 ml-1">{error}</p>
        )}
      </form>

      <div className="space-y-2">
        {crawlStatuses.length > 0 ? (
          crawlStatuses.map((status) => (
            <UrlStatusItem key={status.url} status={status} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No URLs added yet. Add a URL to start crawling.
          </p>
        )}
      </div>
    </div>
  );
}