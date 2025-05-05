import React from 'react';
interface Incident {
  id: number;
  timestamp: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: string;
  name: string;
}
const incidents: Incident[] = [{
  id: 1,
  timestamp: '2023-11-10 14:32:41',
  type: 'Ransomware',
  severity: 'Critical',
  status: 'In Progress',
  name: 'Crypto Ransomware XYZ'
}, {
  id: 2,
  timestamp: '2023-11-09 08:17:36',
  type: 'Unauthorized Access',
  severity: 'High',
  status: 'Resolved',
  name: 'Admin Access Breach'
}, {
  id: 3,
  timestamp: '2023-11-08 21:34:15',
  type: 'Malware Infection',
  severity: 'Medium',
  status: 'Resolved',
  name: 'Trojan Malware ABC'
}, {
  id: 4,
  timestamp: '2023-11-07 10:12:23',
  type: 'Data Leak',
  severity: 'Critical',
  status: 'Investigating',
  name: 'Database Data Breach DEF'
}, {
  id: 5,
  timestamp: '2023-11-06 16:49:07',
  type: 'Phishing',
  severity: 'Low',
  status: 'Contained',
  name: 'Email Phishing QRS'
}];
export function IncidentsTable() {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
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
  return <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-gray-800">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">timestamp</th>
            <th className="px-4 py-3">type</th>
            <th className="px-4 py-3">severity</th>
            <th className="px-4 py-3">status</th>
            <th className="px-4 py-3">name</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => <tr key={incident.id} className="border-b border-gray-800">
              <td className="px-4 py-3">{incident.id}</td>
              <td className="px-4 py-3">{incident.timestamp}</td>
              <td className="px-4 py-3">{incident.type}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs ${getSeverityClass(incident.severity)}`}>
                  {incident.severity}
                </span>
              </td>
              <td className="px-4 py-3">{incident.status}</td>
              <td className="px-4 py-3">{incident.name}</td>
            </tr>)}
        </tbody>
      </table>
    </div>;
}