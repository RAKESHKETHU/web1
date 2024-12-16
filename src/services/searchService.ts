import { SearchResult } from '../types';

// Simulated vector database search with better response times
const vectorDB = new Map<string, SearchResult[]>();

// Pre-populate some vector embeddings
vectorDB.set('machine learning', [
  {
    url: 'https://example.com/ml-basics',
    title: 'Introduction to Machine Learning',
    snippet: 'Machine learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data...',
    relevanceScore: 0.98,
  },
  {
    url: 'https://example.com/neural-networks',
    title: 'Understanding Neural Networks',
    snippet: 'Neural networks are computing systems inspired by biological neural networks that form the basis of many modern AI applications...',
    relevanceScore: 0.92,
  },
]);

vectorDB.set('web crawling', [
  {
    url: 'https://example.com/web-crawling',
    title: 'Web Crawling Fundamentals',
    snippet: 'Web crawling is the systematic browsing of the internet to collect and index web content. Modern crawlers use sophisticated algorithms...',
    relevanceScore: 0.95,
  },
]);

export async function searchDocuments(query: string): Promise<SearchResult[]> {
  // Simulate vector similarity search
  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  
  // Search through our vector database
  for (const [key, docs] of vectorDB.entries()) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      results.push(...docs);
    }
  }
  
  // If no exact matches, return generic results with lower relevance
  if (results.length === 0) {
    return [
      {
        url: 'https://example.com/general-info',
        title: 'Related Information',
        snippet: `Here's what we found related to your search for "${query}". While we don't have an exact match, these results might be helpful...`,
        relevanceScore: 0.75,
      },
    ];
  }
  
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}