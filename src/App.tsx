import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { ThreatAnalysis } from './pages/ThreatAnalysis';
import { VulnerabilityScanner } from './pages/VulnerabilityScanner';
import { DataManagement } from './pages/DataManagement';
import { RiskPrioritization } from './pages/RiskPrioritization';
import { ComplianceStatus } from './pages/ComplianceStatus';
import { ApiSettings } from './pages/ApiSettings';
import { DataProvider } from './context/DataContext';
import { ComplianceProvider } from './context/ComplianceContext';
import { ApiProvider } from './context/ApiContext';
export function App() {
  return <DataProvider>
      <ComplianceProvider>
        <ApiProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/threat-analysis" element={<ThreatAnalysis />} />
                <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
                <Route path="/data-management" element={<DataManagement />} />
                <Route path="/risk-prioritization" element={<RiskPrioritization />} />
                <Route path="/compliance" element={<ComplianceStatus />} />
                <Route path="/settings" element={<ApiSettings />} />
                <Route path="*" element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApiProvider>
      </ComplianceProvider>
    </DataProvider>;
}