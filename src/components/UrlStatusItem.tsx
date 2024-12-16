import React, { memo } from 'react';
import { CrawlStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { formatTimestamp } from '../utils/statusHelpers';

interface UrlStatusItemProps {
  status: CrawlStatus;
}

export const UrlStatusItem = memo(function UrlStatusItem({ status }: UrlStatusItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col flex-1 min-w-0">
        <span className="truncate text-gray-900">{status.url}</span>
        <span className="text-sm text-gray-500">
          Added at {formatTimestamp(status.timestamp)}
        </span>
      </div>
      <StatusBadge status={status.status} />
    </div>
  );
});