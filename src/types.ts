export interface SearchResult {
  url: string;
  title: string;
  snippet: string;
  relevanceScore: number;
}

export interface CrawlStatus {
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  timestamp: string;
}