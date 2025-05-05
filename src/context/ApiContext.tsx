import React, { useState, createContext, useContext } from 'react';
export interface ApiIntegration {
  name: string;
  status: 'Connected' | 'Not Connected' | 'Error';
  apiKey: string;
  lastSync: string;
  description: string;
}
interface ApiSettings {
  timeout: number;
  retryAttempts: number;
  enableCache: boolean;
}
interface ApiContextType {
  integrations: ApiIntegration[];
  settings: ApiSettings;
  updateIntegration: (name: string, data: Partial<ApiIntegration>) => void;
  updateSettings: (settings: Partial<ApiSettings>) => void;
}
const ApiContext = createContext<ApiContextType | undefined>(undefined);
const defaultIntegrations: ApiIntegration[] = [{
  name: 'VirusTotal',
  status: 'Not Connected',
  apiKey: '',
  lastSync: 'Never',
  description: 'Malware and URL analysis API integration'
}, {
  name: 'AbuseIPDB',
  status: 'Not Connected',
  apiKey: '',
  lastSync: 'Never',
  description: 'IP address reputation checking service'
}, {
  name: 'Shodan',
  status: 'Not Connected',
  apiKey: '',
  lastSync: 'Never',
  description: 'Internet-wide scanner for exposed services'
}, {
  name: 'OpenAI',
  status: 'Not Connected',
  apiKey: '',
  lastSync: 'Never',
  description: 'AI-powered threat analysis and classification'
}];
const defaultSettings: ApiSettings = {
  timeout: 30,
  retryAttempts: 3,
  enableCache: false
};
export function ApiProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [integrations, setIntegrations] = useState<ApiIntegration[]>(defaultIntegrations);
  const [settings, setSettings] = useState<ApiSettings>(defaultSettings);
  const updateIntegration = (name: string, data: Partial<ApiIntegration>) => {
    setIntegrations(prev => prev.map(integration => integration.name === name ? {
      ...integration,
      ...data
    } : integration));
  };
  const updateSettings = (newSettings: Partial<ApiSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };
  return <ApiContext.Provider value={{
    integrations,
    settings,
    updateIntegration,
    updateSettings
  }}>
      {children}
    </ApiContext.Provider>;
}
export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}