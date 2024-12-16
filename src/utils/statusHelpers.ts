import { CrawlStatus } from '../types';

export const getStatusColor = (status: CrawlStatus['status']) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    processing: 'bg-blue-100 text-blue-800',
    pending: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || colors.pending;
};

export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString();
};