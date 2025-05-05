import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { useCompliance } from '../../context/ComplianceContext';
const trendData = [{
  month: 'Jul 2024',
  NIST: 72,
  ISO: 75,
  GDPR: 78,
  HIPAA: 76
}, {
  month: 'Sep 2024',
  NIST: 74,
  ISO: 78,
  GDPR: 82,
  HIPAA: 79
}, {
  month: 'Nov 2024',
  NIST: 75,
  ISO: 80,
  GDPR: 79,
  HIPAA: 82
}, {
  month: 'Jan 2025',
  NIST: 76,
  ISO: 82,
  GDPR: 83,
  HIPAA: 81
}, {
  month: 'Mar 2025',
  NIST: 78,
  ISO: 85,
  GDPR: 85,
  HIPAA: 83
}, {
  month: 'May 2025',
  NIST: 80,
  ISO: 87,
  GDPR: 88,
  HIPAA: 85
}];
const projectionData = [{
  month: 'May 2025',
  score: 78
}, {
  month: 'Jun 2025',
  score: 80
}, {
  month: 'Jul 2025',
  score: 82
}, {
  month: 'Aug 2025',
  score: 84
}, {
  month: 'Sep 2025',
  score: 86
}, {
  month: 'Oct 2025',
  score: 88
}];
export function ComplianceTimeline() {
  const {
    trends,
    frameworks,
    activeFramework,
    setActiveFramework,
    loading
  } = useCompliance();
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Compliance Score Trends Over Time
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg" style={{
        height: '400px'
      }}>
          <ResponsiveContainer>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Legend />
              {frameworks.map(framework => <Line key={framework.id} type="monotone" dataKey={framework.name} stroke={framework.id === 'nist' ? '#EF4444' : framework.id === 'iso' ? '#3B82F6' : framework.id === 'gdpr' ? '#10B981' : framework.id === 'hipaa' ? '#F59E0B' : '#6366F1'} />)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Projected Compliance Improvements
        </h2>
        <div className="mb-4">
          <select className="w-full bg-gray-800 text-gray-300 rounded-md px-3 py-2">
            <option>NIST Cybersecurity Framework</option>
          </select>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg" style={{
        height: '400px'
      }}>
          <ResponsiveContainer>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[50, 100]} />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Recommended Compliance Improvements
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="font-medium mb-2">NIST Cybersecurity Framework</h3>
          <h4 className="text-sm text-gray-400 mb-2">
            Protect (Current Score: 77%)
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
            <li>
              Update Protect policies and procedures to align with current
              compliance requirements.
            </li>
          </ul>
        </div>
      </div>
    </div>;
}