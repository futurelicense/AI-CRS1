import React, { useState } from 'react';
interface ThreatIntelligenceItem {
  id: number;
  name: string;
  type: string;
  threat_level: string;
  last_seen: string;
}
const threatIntelligenceData: ThreatIntelligenceItem[] = [{
  id: 0,
  name: 'EMOTET Botnet Activity',
  type: 'Malware',
  threat_level: 'High',
  last_seen: '2023-11-05'
}, {
  id: 1,
  name: 'Ransomware Campaign',
  type: 'Ransomware',
  threat_level: 'Critical',
  last_seen: '2023-11-12'
}, {
  id: 2,
  name: 'APT23 Activity',
  type: 'APT',
  threat_level: 'Critical',
  last_seen: '2023-11-08'
}, {
  id: 3,
  name: 'Log4j Exploitation',
  type: 'Vulnerability',
  threat_level: 'High',
  last_seen: '2023-11-10'
}, {
  id: 4,
  name: 'DDoS Botnet',
  type: 'DDoS',
  threat_level: 'Medium',
  last_seen: '2023-12-14'
}, {
  id: 5,
  name: 'Supply Chain Attack',
  type: 'Supply Chain',
  threat_level: 'High',
  last_seen: '2023-11-04'
}, {
  id: 6,
  name: 'Credential Stuffing',
  type: 'Credential Theft',
  threat_level: 'Medium',
  last_seen: '2023-11-13'
}, {
  id: 7,
  name: 'Zero-day Exploit',
  type: 'Vulnerability',
  threat_level: 'Critical',
  last_seen: '2023-11-11'
}];
interface ThreatDetailProps {
  threatId: number | null;
}
function ThreatDetail({
  threatId
}: ThreatDetailProps) {
  if (threatId === null) return null;
  const threat = threatIntelligenceData[threatId];
  if (!threat) return null;
  return <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">{threat.name}</h3>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-400">Type: {threat.type}</div>
          <div className="text-sm text-gray-400">
            Threat Level: {threat.threat_level}
          </div>
          <div className="text-sm text-gray-400">
            Last Seen: {threat.last_seen}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-sm text-gray-300">
            {threat.name === 'EMOTET Botnet Activity' ? 'EMOTET botnet activity detected with new command and control servers.' : 'Detailed threat information and analysis would appear here.'}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">
            Indicators of Compromise (IoCs)
          </h4>
          {threat.name === 'EMOTET Botnet Activity' && <div className="space-y-2">
              <div className="font-mono text-sm text-blue-400">45.32.12.34</div>
              <div className="font-mono text-sm text-gray-400">
                emotet-loader.xyz
              </div>
              <div className="font-mono text-sm text-gray-400">
                2c7c68a043873a4a8f11f893b5cee9e
              </div>
            </div>}
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Recommended Mitigations</h4>
          <ul className="list-disc list-inside text-sm text-gray-300">
            <li>
              Block listed IPs and domains, scan for indicators of compromise
            </li>
          </ul>
        </div>
      </div>
    </div>;
}
export function ThreatIntelligence() {
  const [selectedThreat, setSelectedThreat] = useState<number | null>(0);
  return <div>
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Select Threat Type
        </label>
        <select className="w-full bg-gray-800 text-gray-300 rounded-md px-3 py-2">
          <option>All</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">name</th>
              <th className="px-4 py-3">type</th>
              <th className="px-4 py-3">threat_level</th>
              <th className="px-4 py-3">last_seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {threatIntelligenceData.map(threat => <tr key={threat.id} className={`border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors ${selectedThreat === threat.id ? 'bg-gray-800' : ''}`} onClick={() => setSelectedThreat(threat.id)}>
                <td className="px-4 py-3">{threat.id}</td>
                <td className="px-4 py-3">{threat.name}</td>
                <td className="px-4 py-3">{threat.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded ${threat.threat_level === 'Critical' ? 'bg-red-600' : threat.threat_level === 'High' ? 'bg-orange-500' : threat.threat_level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                    {threat.threat_level}
                  </span>
                </td>
                <td className="px-4 py-3">{threat.last_seen}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <label className="block text-sm text-gray-400 mb-2">
          Select Threat for Detailed Intelligence
        </label>
        <select className="w-full bg-gray-800 text-gray-300 rounded-md px-3 py-2" value={selectedThreat || ''} onChange={e => setSelectedThreat(Number(e.target.value))}>
          {threatIntelligenceData.map(threat => <option key={threat.id} value={threat.id}>
              {threat.name}
            </option>)}
        </select>
      </div>
      <ThreatDetail threatId={selectedThreat} />
    </div>;
}