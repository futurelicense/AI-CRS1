import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
}
export function StatCard({
  title,
  value,
  change,
  changeType
}: StatCardProps) {
  return <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <div className="flex items-end">
        <span className="text-3xl font-bold">{value}</span>
        {change !== undefined && <div className="ml-2 mb-1 flex items-center">
            {changeType === 'increase' ? <ArrowUpIcon size={14} className="text-green-500" /> : <ArrowDownIcon size={14} className="text-red-500" />}
            <span className={`text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(change)}%
            </span>
          </div>}
      </div>
    </div>;
}