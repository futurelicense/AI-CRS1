import React, { useState } from 'react';
import { PageHeader } from '../components/UI/PageHeader';
import { ThreatOverview } from '../components/Threat/ThreatOverview';
import { ThreatIntelligence } from '../components/Threat/ThreatIntelligence';
import { ThreatClassification } from '../components/Threat/ThreatClassification';
import { PredictiveAnalysis } from '../components/Threat/PredictiveAnalysis';
type TabType = 'overview' | 'intelligence' | 'classification' | 'predictive';
export function ThreatAnalysis() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  return <div>
      <PageHeader title="Threat Analysis" description="This page provides detailed analysis of detected threats, including AI-powered classification and recommendations." />
      <div className="mb-6">
        <ul className="flex space-x-1 border-b border-gray-700">
          <li className={`pb-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'overview' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('overview')}>
              Threat Overview
            </button>
          </li>
          <li className={`pb-2 px-4 ${activeTab === 'intelligence' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'intelligence' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('intelligence')}>
              Threat Intelligence
            </button>
          </li>
          <li className={`pb-2 px-4 ${activeTab === 'classification' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'classification' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('classification')}>
              Threat Classification
            </button>
          </li>
          <li className={`pb-2 px-4 ${activeTab === 'predictive' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'predictive' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('predictive')}>
              Predictive Analysis
            </button>
          </li>
        </ul>
      </div>
      {activeTab === 'overview' && <ThreatOverview />}
      {activeTab === 'intelligence' && <ThreatIntelligence />}
      {activeTab === 'classification' && <ThreatClassification />}
      {activeTab === 'predictive' && <PredictiveAnalysis />}
    </div>;
}