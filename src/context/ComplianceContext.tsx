import React, { useState, createContext, useContext } from 'react';
export interface Framework {
  id: string;
  name: string;
  score: number;
  target: number;
  lastAssessment: string;
  criticalFindings: number;
  change: number;
}
export interface Finding {
  id: number;
  finding: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Under Review' | 'In Progress' | 'Resolved';
  framework: string;
}
export interface CategoryScore {
  name: string;
  score: number;
  target: number;
}
export interface TrendPoint {
  month: string;
  [key: string]: number | string;
}
interface ComplianceContextType {
  frameworks: Framework[];
  findings: Finding[];
  categoryScores: CategoryScore[];
  trends: TrendPoint[];
  activeFramework: string;
  setActiveFramework: (id: string) => void;
  loading: boolean;
}
const defaultFrameworks: Framework[] = [{
  id: 'nist',
  name: 'NIST Cybersecurity Framework',
  score: 78,
  target: 90,
  lastAssessment: '2025-03-06',
  criticalFindings: 5,
  change: 1
}, {
  id: 'pci',
  name: 'PCI DSS',
  score: 88,
  target: 90,
  lastAssessment: '2025-02-25',
  criticalFindings: 3,
  change: 2
}, {
  id: 'hipaa',
  name: 'HIPAA',
  score: 80,
  target: 90,
  lastAssessment: '2025-03-12',
  criticalFindings: 6,
  change: -1
}, {
  id: 'gdpr',
  name: 'GDPR',
  score: 85,
  target: 90,
  lastAssessment: '2025-03-09',
  criticalFindings: 4,
  change: 3
}, {
  id: 'iso',
  name: 'ISO 27001',
  score: 87,
  target: 90,
  lastAssessment: '2025-03-02',
  criticalFindings: 2,
  change: 2
}];
const defaultFindings: Finding[] = [{
  id: 0,
  finding: 'Lack of regular testing for Protect systems',
  category: 'Protect',
  severity: 'High',
  status: 'Under Review',
  framework: 'nist'
}, {
  id: 1,
  finding: 'Missing documentation for Protect procedures',
  category: 'Protect',
  severity: 'High',
  status: 'Open',
  framework: 'nist'
}, {
  id: 2,
  finding: 'Missing documentation for Protect procedures',
  category: 'Protect',
  severity: 'Low',
  status: 'Open',
  framework: 'nist'
}];
const defaultCategoryScores: CategoryScore[] = [{
  name: 'Protect',
  score: 77,
  target: 90
}, {
  name: 'Detect',
  score: 85,
  target: 90
}, {
  name: 'Recover',
  score: 82,
  target: 90
}, {
  name: 'Identify',
  score: 88,
  target: 90
}, {
  name: 'Respond',
  score: 83,
  target: 90
}];
const defaultTrends: TrendPoint[] = [{
  month: 'Jul 2024',
  NIST: 72,
  ISO: 75,
  GDPR: 78,
  HIPAA: 76,
  PCI: 80
}, {
  month: 'Sep 2024',
  NIST: 74,
  ISO: 78,
  GDPR: 82,
  HIPAA: 79,
  PCI: 82
}, {
  month: 'Nov 2024',
  NIST: 75,
  ISO: 80,
  GDPR: 79,
  HIPAA: 82,
  PCI: 84
}, {
  month: 'Jan 2025',
  NIST: 76,
  ISO: 82,
  GDPR: 83,
  HIPAA: 81,
  PCI: 85
}, {
  month: 'Mar 2025',
  NIST: 78,
  ISO: 85,
  GDPR: 85,
  HIPAA: 83,
  PCI: 87
}, {
  month: 'May 2025',
  NIST: 80,
  ISO: 87,
  GDPR: 88,
  HIPAA: 85,
  PCI: 88
}];
const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);
export function ComplianceProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [activeFramework, setActiveFramework] = useState('nist');
  const [loading] = useState(false);
  const value = {
    frameworks: defaultFrameworks,
    findings: defaultFindings,
    categoryScores: defaultCategoryScores,
    trends: defaultTrends,
    activeFramework,
    setActiveFramework,
    loading
  };
  return <ComplianceContext.Provider value={value}>
      {children}
    </ComplianceContext.Provider>;
}
export function useCompliance() {
  const context = useContext(ComplianceContext);
  if (context === undefined) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
}