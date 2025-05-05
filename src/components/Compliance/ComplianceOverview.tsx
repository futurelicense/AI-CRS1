import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useCompliance } from '../../context/ComplianceContext';
export function ComplianceOverview() {
  const {
    frameworks,
    loading
  } = useCompliance();
  const frameworkScores = frameworks.map(f => ({
    name: f.name,
    score: f.score,
    target: f.target
  }));
  const criticalFindings = frameworks.map(f => ({
    name: f.name,
    count: f.criticalFindings
  }));
  const lastAssessments = frameworks.map(f => {
    const assessmentDate = new Date(f.lastAssessment);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - assessmentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      name: f.name,
      days: diffDays
    };
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Compliance Scores by Framework
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={frameworkScores} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={200} />
            <Bar dataKey="score" fill="#F97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Critical Findings Summary
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={criticalFindings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="count" fill="#DC2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Last Assessment Dates</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={lastAssessments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="days" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>;
}