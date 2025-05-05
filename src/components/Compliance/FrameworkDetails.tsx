import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useCompliance } from '../../context/ComplianceContext';
const radarData = [{
  subject: 'Protect',
  A: 85,
  B: 90
}, {
  subject: 'Detect',
  A: 75,
  B: 90
}, {
  subject: 'Identify',
  A: 82,
  B: 90
}, {
  subject: 'Respond',
  A: 78,
  B: 90
}, {
  subject: 'Recover',
  A: 72,
  B: 90
}];
const categoryData = [{
  name: 'Protect',
  score: 77
}, {
  name: 'Detect',
  score: 85
}, {
  name: 'Recover',
  score: 82
}, {
  name: 'Identify',
  score: 88
}, {
  name: 'Respond',
  score: 83
}];
const findings = [{
  id: 0,
  finding: 'Lack of regular testing for Protect systems',
  category: 'Protect',
  severity: 'High',
  status: 'Under Review'
}, {
  id: 1,
  finding: 'Missing documentation for Protect procedures',
  category: 'Protect',
  severity: 'High',
  status: 'Open'
}, {
  id: 2,
  finding: 'Missing documentation for Protect procedures',
  category: 'Protect',
  severity: 'Low',
  status: 'Open'
}];
export function FrameworkDetails() {
  const {
    frameworks,
    activeFramework,
    setActiveFramework,
    categoryScores,
    findings,
    loading
  } = useCompliance();
  const currentFramework = frameworks.find(f => f.id === activeFramework);
  const radarData = categoryScores.map(cat => ({
    subject: cat.name,
    A: cat.score,
    B: cat.target
  }));
  const frameworkFindings = findings.filter(f => f.framework === activeFramework);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>
      <div className="mb-6">
        <select className="w-full bg-gray-800 text-gray-300 rounded-md px-3 py-2" value={activeFramework} onChange={e => setActiveFramework(e.target.value)}>
          {frameworks.map(framework => <option key={framework.id} value={framework.id}>
              {framework.name}
            </option>)}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Overall Compliance</h3>
          <div className="text-3xl font-bold">{currentFramework?.score}%</div>
          <div className={`text-sm ${currentFramework?.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {currentFramework?.change >= 0 ? '+' : ''}
            {currentFramework?.change}%
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Critical Findings</h3>
          <div className="text-3xl font-bold">
            {currentFramework?.criticalFindings}
          </div>
          <div className="text-sm text-green-500">-0</div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Last Assessment</h3>
          <div className="text-3xl font-bold">
            {currentFramework?.lastAssessment}
          </div>
          <div className="text-sm text-green-500">36 days ago</div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          NIST Cybersecurity Framework Compliance Assessment
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg" style={{
        height: '400px'
      }}>
          <ResponsiveContainer>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Current" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              <Radar name="Target" dataKey="B" stroke="#6B7280" fill="#6B7280" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Category Compliance Details
        </h2>
        <div className="space-y-4">
          {categoryData.map(cat => <div key={cat.name} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>{cat.name}</span>
                <span>{cat.score}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{
              width: `${cat.score}%`
            }} />
              </div>
            </div>)}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Top Compliance Findings</h2>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Finding
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {findings.map(finding => <tr key={finding.id}>
                  <td className="px-6 py-4">{finding.id}</td>
                  <td className="px-6 py-4">{finding.finding}</td>
                  <td className="px-6 py-4">{finding.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${finding.severity === 'High' ? 'bg-orange-500' : 'bg-green-500'}`}>
                      {finding.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">{finding.status}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}