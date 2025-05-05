import React from 'react';
import { PageHeader } from '../components/UI/PageHeader';
import { AlertTriangleIcon, ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
interface RiskItem {
  id: string;
  name: string;
  category: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  likelihood: 'Very Likely' | 'Likely' | 'Possible' | 'Unlikely';
  score: number;
  trend: 'up' | 'down' | 'stable';
  mitigation: string;
}
const riskItems: RiskItem[] = [{
  id: 'RISK-001',
  name: 'Unauthorized System Access',
  category: 'Access Control',
  impact: 'Critical',
  likelihood: 'Possible',
  score: 8.7,
  trend: 'up',
  mitigation: 'Implement zero-trust architecture and MFA'
}, {
  id: 'RISK-002',
  name: 'Data Exfiltration',
  category: 'Data Security',
  impact: 'Critical',
  likelihood: 'Likely',
  score: 9.2,
  trend: 'up',
  mitigation: 'Deploy DLP solutions and enhance monitoring'
}, {
  id: 'RISK-003',
  name: 'Supply Chain Compromise',
  category: 'Third Party',
  impact: 'High',
  likelihood: 'Possible',
  score: 7.5,
  trend: 'stable',
  mitigation: 'Vendor security assessments and monitoring'
}, {
  id: 'RISK-004',
  name: 'Cloud Misconfiguration',
  category: 'Cloud Security',
  impact: 'High',
  likelihood: 'Likely',
  score: 8.1,
  trend: 'down',
  mitigation: 'Regular cloud security posture assessments'
}];
export function RiskPrioritization() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical':
        return 'bg-red-600';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="text-red-500" size={16} />;
      case 'down':
        return <ArrowDownIcon className="text-green-500" size={16} />;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };
  return <div>
      <PageHeader title="Risk Prioritization" description="Analyze and prioritize risks based on impact, likelihood, and current mitigation status." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Risk Score Distribution</h3>
            <AlertTriangleIcon className="text-yellow-500" size={20} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Critical (8.0-10.0)</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{
                width: '40%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>High (6.0-7.9)</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{
                width: '35%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Medium (4.0-5.9)</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{
                width: '15%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Low (0-3.9)</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{
                width: '10%'
              }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Risk by Category</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Access Control</span>
              <span className="text-red-500">High</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Security</span>
              <span className="text-red-500">High</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cloud Security</span>
              <span className="text-orange-500">Medium</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Third Party</span>
              <span className="text-yellow-500">Medium</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Risk Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Overall Risk Score</span>
              <div className="flex items-center">
                <span className="mr-2">8.4</span>
                <ArrowUpIcon className="text-red-500" size={16} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>New Risks (30 days)</span>
              <span>+5</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Mitigated Risks</span>
              <span>3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending Review</span>
              <span>7</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Top Risks</h2>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Likelihood
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Mitigation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {riskItems.map(risk => <tr key={risk.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium">{risk.name}</div>
                      <div className="text-sm text-gray-400">{risk.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{risk.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${getImpactColor(risk.impact)}`}>
                      {risk.impact}
                    </span>
                  </td>
                  <td className="px-6 py-4">{risk.likelihood}</td>
                  <td className="px-6 py-4">{risk.score}</td>
                  <td className="px-6 py-4">{getTrendIcon(risk.trend)}</td>
                  <td className="px-6 py-4 text-sm">{risk.mitigation}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}