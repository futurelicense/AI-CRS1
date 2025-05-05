import React from 'react';
import { ShieldIcon } from 'lucide-react';
interface PageHeaderProps {
  title: string;
  description?: string;
}
export function PageHeader({
  title,
  description
}: PageHeaderProps) {
  return <div className="mb-6">
      <div className="flex items-center mb-2">
        <ShieldIcon className="mr-2 text-red-500" size={24} />
        <h1 className="text-2xl font-bold text-white">
          AI-Powered Cyber Risk Assessment System
        </h1>
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {description && <div className="bg-gray-800 p-4 rounded text-sm text-gray-300">
          {description}
        </div>}
    </div>;
}