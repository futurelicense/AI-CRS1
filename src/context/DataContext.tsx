import React, { useCallback, useEffect, useState, createContext, useContext } from 'react';
export interface ThreatData {
  id: number;
  name: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  source: string;
  timestamp: string;
  description: string;
  confidence: number;
  status: string;
}
export interface VulnerabilityData {
  id: number;
  name: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvss_score: number;
  affected_systems: string;
  status: string;
  discovered_date: string;
  description: string;
}
export interface IncidentData {
  id: number;
  name: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: string;
  timestamp: string;
  description: string;
  affected_assets: string;
}
interface DataContextType {
  threats: ThreatData[];
  vulnerabilities: VulnerabilityData[];
  incidents: IncidentData[];
  isLoading: boolean;
  error: string | null;
  updateThreats: (data: ThreatData[]) => void;
  updateVulnerabilities: (data: VulnerabilityData[]) => void;
  updateIncidents: (data: IncidentData[]) => void;
  resetToSampleData: () => void;
}
const DataContext = createContext<DataContextType | undefined>(undefined);
const sampleThreats: ThreatData[] = [{
  id: 1,
  name: 'Trojan Malware ABC',
  category: 'Malware',
  severity: 'High',
  source: 'SIEM',
  timestamp: '2023-10-15 08:23:45',
  description: 'Detected trojan malware attempting to establish C2 communication.',
  confidence: 0.87,
  status: 'Active'
}, {
  id: 2,
  name: 'Crypto Ransomware XYZ',
  category: 'Ransomware',
  severity: 'Critical',
  source: 'Endpoint Protection',
  timestamp: '2023-10-22 14:56:32',
  description: 'Potential crypto ransomware activity detected with file encryption attempts.',
  confidence: 0.92,
  status: 'Investigating'
}, {
  id: 3,
  name: 'Email Phishing QRS',
  category: 'Phishing',
  severity: 'Medium',
  source: 'DKIM/SPF',
  timestamp: '2023-11-01 10:12:09',
  description: 'Email phishing campaign targeting corporate credentials.',
  confidence: 0.78,
  status: 'Active'
}, {
  id: 4,
  name: 'Volumetric DDoS TUV',
  category: 'DDoS',
  severity: 'High',
  source: 'IDS/IPS',
  timestamp: '2023-10-25 19:34:27',
  description: 'Volumetric DDoS attack targeting web services.',
  confidence: 0.89,
  status: 'Mitigated'
}, {
  id: 5,
  name: 'Database Data Breach DEF',
  category: 'Data Breach',
  severity: 'Critical',
  source: 'SIEM',
  timestamp: '2023-11-05 07:45:18',
  description: 'Potential data exfiltration from database systems.',
  confidence: 0.81,
  status: 'Investigating'
}];
const sampleVulnerabilities: VulnerabilityData[] = [{
  id: 1,
  name: 'SQL Injection',
  severity: 'Critical',
  cvss_score: 9.2,
  affected_systems: 'Application Web Server',
  status: 'None',
  discovered_date: 'CVE-2022-24654',
  description: 'Allowing SQL injection attacks. Affects Web Server.'
}, {
  id: 2,
  name: 'Cross-Site Scripting (XSS)',
  severity: 'Critical',
  cvss_score: 7.5,
  affected_systems: 'Web Application',
  status: 'None',
  discovered_date: 'CVE-2022-34114',
  description: "Web application allows injection of malicious scripts that execute in users' browsers. Affects Web Application."
}, {
  id: 3,
  name: 'Broken Authentication',
  severity: 'Critical',
  cvss_score: 8.7,
  affected_systems: 'Authentication Systems',
  status: 'None',
  discovered_date: 'CVE-2021-87325',
  description: 'Authentication mechanisms are improperly implemented.'
}, {
  id: 4,
  name: 'Sensitive Data Exposure',
  severity: 'High',
  cvss_score: 7.8,
  affected_systems: 'Database',
  status: 'None',
  discovered_date: 'CVE-2023-12458',
  description: 'Application transmits or stores sensitive data without proper encryption. Affects Database.'
}, {
  id: 5,
  name: 'Outdated Software',
  severity: 'Medium',
  cvss_score: 5.6,
  affected_systems: 'Email Server',
  status: 'None',
  discovered_date: 'CVE-2022-5647',
  description: 'System is running an outdated version with known security vulnerabilities. Affects Email Server.'
}];
const sampleIncidents: IncidentData[] = [{
  id: 1,
  name: 'Ransomware Attack',
  type: 'Ransomware',
  severity: 'Critical',
  status: 'In Progress',
  timestamp: '2023-11-10 14:23:42',
  description: 'Ransomware encrypting database backup files detected.',
  affected_assets: '45.89.128.75'
}, {
  id: 2,
  name: 'Unauthorized Access',
  type: 'Unauthorized Access',
  severity: 'High',
  status: 'Resolved',
  timestamp: '2023-11-09 08:17:36',
  description: 'Unauthorized login detected in Authentication System from unusual location.',
  affected_assets: '165.45.68.212'
}, {
  id: 3,
  name: 'Malware Detection',
  type: 'Malware Infection',
  severity: 'Medium',
  status: 'Resolved',
  timestamp: '2023-11-08 21:34:15',
  description: 'Malware detected on Employee Workstation. Antivirus quarantined the threat but further investigation required.',
  affected_assets: '187.23.45.109'
}, {
  id: 4,
  name: 'Data Breach',
  type: 'Data Leak',
  severity: 'Critical',
  status: 'Investigating',
  timestamp: '2023-11-07 10:12:23',
  description: 'Sensitive data from Database potentially exposed to unauthorized parties.',
  affected_assets: '209.57.129.44'
}, {
  id: 5,
  name: 'Phishing Campaign',
  type: 'Phishing',
  severity: 'Low',
  status: 'Contained',
  timestamp: '2023-11-06 15:49:07',
  description: 'User reported phishing email that attempted to harvest credentials for Email System.',
  affected_assets: '78.123.45.218'
}];
export function DataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [threats, setThreats] = useState<ThreatData[]>(sampleThreats);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityData[]>(sampleVulnerabilities);
  const [incidents, setIncidents] = useState<IncidentData[]>(sampleIncidents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updateThreats = useCallback((data: ThreatData[]) => {
    console.log('Updating threats with:', data); // Debug log
    setThreats(data);
  }, []);
  const updateVulnerabilities = useCallback((data: VulnerabilityData[]) => {
    setVulnerabilities(data);
  }, []);
  const updateIncidents = useCallback((data: IncidentData[]) => {
    setIncidents(data);
  }, []);
  const resetToSampleData = useCallback(() => {
    setThreats(sampleThreats);
    setVulnerabilities(sampleVulnerabilities);
    setIncidents(sampleIncidents);
    setError(null);
  }, []);
  // Debug log for state changes
  useEffect(() => {
    console.log('Current threats:', threats);
  }, [threats]);
  return <DataContext.Provider value={{
    threats,
    vulnerabilities,
    incidents,
    isLoading,
    error,
    updateThreats,
    updateVulnerabilities,
    updateIncidents,
    resetToSampleData
  }}>
      {children}
    </DataContext.Provider>;
}
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}