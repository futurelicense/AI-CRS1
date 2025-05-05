import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [{
  name: 'APT',
  critical: 1,
  high: 1,
  medium: 1,
  low: 0
}, {
  name: 'Data Breach',
  critical: 1,
  high: 1,
  medium: 0,
  low: 0
}, {
  name: 'Insider Threat',
  critical: 1,
  high: 1,
  medium: 0,
  low: 0
}, {
  name: 'Ransomware',
  critical: 2,
  high: 1,
  medium: 0,
  low: 0
}, {
  name: 'DDoS',
  critical: 0,
  high: 1,
  medium: 1,
  low: 0
}, {
  name: 'Malware',
  critical: 0,
  high: 1,
  medium: 1,
  low: 0
}, {
  name: 'Phishing',
  critical: 0,
  high: 0,
  medium: 1,
  low: 1
}];
export function ThreatsByCategoryChart() {
  return <div className="w-full h-72">
      <h3 className="text-sm text-gray-400 mb-4">
        Threats by Category and Severity
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }} stackOffset="expand">
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" tick={{
          fill: '#ccc'
        }} />
          <YAxis tick={{
          fill: '#ccc'
        }} />
          <Tooltip contentStyle={{
          backgroundColor: '#1f2937',
          border: 'none',
          borderRadius: '4px',
          color: '#fff'
        }} />
          <Legend />
          <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
          <Bar dataKey="high" stackId="a" fill="#f97316" name="High" />
          <Bar dataKey="medium" stackId="a" fill="#facc15" name="Medium" />
          <Bar dataKey="low" stackId="a" fill="#a3e635" name="Low" />
        </BarChart>
      </ResponsiveContainer>
    </div>;
}