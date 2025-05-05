import React from 'react';
import { ShieldAlertIcon, BarChartIcon, FileTextIcon, ScanIcon, LayersIcon, SettingsIcon, DatabaseIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navItems = [{
    name: 'Dashboard',
    path: '/',
    icon: <BarChartIcon size={18} />
  }, {
    name: 'Threat Analysis',
    path: '/threat-analysis',
    icon: <ShieldAlertIcon size={18} />
  }, {
    name: 'Vulnerability Scanner',
    path: '/vulnerability-scanner',
    icon: <ScanIcon size={18} />
  }, {
    name: 'Data Management',
    path: '/data-management',
    icon: <DatabaseIcon size={18} />
  }, {
    name: 'Risk Prioritization',
    path: '/risk-prioritization',
    icon: <LayersIcon size={18} />
  }, {
    name: 'Compliance Status',
    path: '/compliance',
    icon: <FileTextIcon size={18} />
  }, {
    name: 'API Settings',
    path: '/settings',
    icon: <SettingsIcon size={18} />
  }];
  return <div className="w-56 min-h-screen bg-gray-900 text-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">app</h2>
      </div>
      <nav className="flex-1">
        <ul className="py-2">
          {navItems.map(item => <li key={item.path}>
              <Link to={item.path} className={`flex items-center px-4 py-3 text-sm hover:bg-gray-800 ${isActive(item.path) ? 'bg-gray-800' : ''}`}>
                <span className="mr-3">{item.icon}</span>
                {item.name.toLowerCase()}
              </Link>
            </li>)}
        </ul>
      </nav>
    </div>;
}