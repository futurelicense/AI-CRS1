import React from 'react';
import { PageHeader } from '../components/UI/PageHeader';
import { StatCard } from '../components/UI/StatCard';
import { ThreatsByCategoryChart } from '../components/Charts/ThreatsByCategoryChart';
import { IncidentsTable } from '../components/Tables/IncidentsTable';
export function Dashboard() {
  return <div>
      <PageHeader title="Cybersecurity Risk Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Threats" value="25" change={5} changeType="increase" />
        <StatCard title="Critical Vulnerabilities" value="0" change={20} changeType="decrease" />
        <StatCard title="Overall Risk Score" value="76/100" change={4} changeType="decrease" />
        <StatCard title="Compliance Rate" value="82%" change={3} changeType="increase" />
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Threat Overview</h2>
        <ThreatsByCategoryChart />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Incidents</h2>
        <IncidentsTable />
      </div>
    </div>;
}