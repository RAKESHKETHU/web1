import React from 'react';
import { Loader2 } from 'lucide-react';
import { CrawlStatus } from '../types';
import { getStatusColor } from '../utils/statusHelpers';

interface StatusBadgeProps {
  status: CrawlStatus['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'processing' && (
        <Loader2 className="animate-spin" size={18} />
      )}
      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
        {status}
      </span>
    </div>
  );
}