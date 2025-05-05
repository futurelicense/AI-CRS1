import React, { useState } from 'react';
import { PageHeader } from '../components/UI/PageHeader';
import { ComplianceOverview } from '../components/Compliance/ComplianceOverview';
import { FrameworkDetails } from '../components/Compliance/FrameworkDetails';
import { ComplianceTimeline } from '../components/Compliance/ComplianceTimeline';
type TabType = 'overview' | 'framework' | 'timeline';
export function ComplianceStatus() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  return <div>
      <PageHeader title="Compliance Status" description="Track compliance status against various cybersecurity frameworks and regulations." />
      <div className="mb-6">
        <ul className="flex space-x-1 border-b border-gray-700">
          <li className={`pb-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'overview' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('overview')}>
              Compliance Overview
            </button>
          </li>
          <li className={`pb-2 px-4 ${activeTab === 'framework' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'framework' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('framework')}>
              Framework Details
            </button>
          </li>
          <li className={`pb-2 px-4 ${activeTab === 'timeline' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'timeline' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('timeline')}>
              Compliance Timeline
            </button>
          </li>
        </ul>
      </div>
      {activeTab === 'overview' && <ComplianceOverview />}
      {activeTab === 'framework' && <FrameworkDetails />}
      {activeTab === 'timeline' && <ComplianceTimeline />}
    </div>;
}