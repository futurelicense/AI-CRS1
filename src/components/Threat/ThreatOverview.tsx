import React from 'react';
import { ChevronDownIcon, RefreshCwIcon } from 'lucide-react';
interface FilterBadgeProps {
  children: React.ReactNode;
  color?: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
}
function FilterBadge({
  children,
  color = 'bg-red-500',
  count,
  selected = false,
  onClick
}: FilterBadgeProps) {
  return <button className={`${color} text-white text-xs px-2 py-1 rounded flex items-center ${!selected && 'opacity-60'} hover:opacity-100 transition-opacity`} onClick={onClick}>
      {children}
      {count !== undefined && <span className={`ml-1 ${color} bg-opacity-50 px-1 rounded`}>
          {count}
        </span>}
    </button>;
}
interface ThreatDetailsItemProps {
  name: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}
function ThreatDetailsItem({
  name,
  severity
}: ThreatDetailsItemProps) {
  return <div className="bg-gray-800/50 rounded-md p-4 flex justify-between items-center">
      <div>
        <span className="font-medium">{name}</span>
        <span className={`ml-2 text-xs px-2 py-1 rounded ${severity === 'Critical' ? 'bg-red-600' : severity === 'High' ? 'bg-orange-500' : severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
          {severity}
        </span>
      </div>
      <button className="text-gray-400">
        <ChevronDownIcon size={20} />
      </button>
    </div>;
}
export function ThreatOverview() {
  return <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Current Threat Landscape</h2>
        <div className="flex items-center text-sm text-gray-400">
          <span className="mr-1">Refresh</span>
          <RefreshCwIcon size={14} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-md p-3">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-400">Filter by Severity</span>
          </div>
          <div className="flex space-x-2">
            <FilterBadge color="bg-red-600" count={4} selected>
              Critical
            </FilterBadge>
            <FilterBadge color="bg-orange-500" count={3} selected>
              High
            </FilterBadge>
            <FilterBadge color="bg-yellow-500" count={2} selected>
              Medium
            </FilterBadge>
            <FilterBadge color="bg-green-500" count={1} selected>
              Low
            </FilterBadge>
          </div>
        </div>
        <div className="bg-gray-800 rounded-md p-3">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-400">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterBadge color="bg-red-500" selected>
              APT
            </FilterBadge>
            <FilterBadge color="bg-red-500" selected>
              DDoS
            </FilterBadge>
            <FilterBadge color="bg-red-500" selected>
              Data Breach
            </FilterBadge>
            <FilterBadge color="bg-red-500" selected>
              Insider Threat
            </FilterBadge>
            <FilterBadge color="bg-red-500" selected>
              Malware
            </FilterBadge>
            <FilterBadge color="bg-red-500" selected>
              Phishing
            </FilterBadge>
            <FilterBadge color="bg-red-500" selected>
              Ransomware
            </FilterBadge>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-sm text-gray-400 mb-4">
          Threats by Category and Severity
        </h3>
        <div className="w-full h-72 bg-gray-800/50 rounded-lg" />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Threat Details</h2>
        <div className="space-y-2">
          <ThreatDetailsItem name="Trojan Malware ABC" severity="High" />
          <ThreatDetailsItem name="Crypto Ransomware XYZ" severity="Critical" />
          <ThreatDetailsItem name="Email Phishing QRS" severity="Medium" />
          <ThreatDetailsItem name="Volumetric DDoS TUV" severity="High" />
          <ThreatDetailsItem name="Database Data Breach DEF" severity="Critical" />
          <ThreatDetailsItem name="Employee Insider Threat GHI" severity="Medium" />
          <ThreatDetailsItem name="Nation-state APT JKL" severity="High" />
          <ThreatDetailsItem name="Worm Malware MNO" severity="Medium" />
        </div>
      </div>
    </div>;
}