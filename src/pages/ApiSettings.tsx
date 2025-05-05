import React, { useState } from 'react';
import { PageHeader } from '../components/UI/PageHeader';
import { KeyIcon, ShieldIcon, AlertCircleIcon, CheckCircleIcon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';
import { useApi } from '../context/ApiContext';
interface ApiIntegration {
  name: string;
  status: 'Connected' | 'Not Connected' | 'Error';
  apiKey: string;
  lastSync: string;
  description: string;
}
export function ApiSettings() {
  const {
    integrations,
    settings,
    updateIntegration,
    updateSettings
  } = useApi();
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected':
        return <CheckCircleIcon className="text-green-500" size={20} />;
      case 'Error':
        return <AlertCircleIcon className="text-red-500" size={20} />;
      default:
        return <AlertCircleIcon className="text-gray-500" size={20} />;
    }
  };
  const handleConnect = async (name: string, apiKey: string) => {
    setLoading(prev => ({
      ...prev,
      [name]: true
    }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateIntegration(name, {
        status: 'Connected',
        apiKey,
        lastSync: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });
      setMessage({
        text: `Successfully connected to ${name}`,
        type: 'success'
      });
    } catch (error) {
      setMessage({
        text: `Failed to connect to ${name}`,
        type: 'error'
      });
    } finally {
      setLoading(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  const handleDisconnect = async (name: string) => {
    setLoading(prev => ({
      ...prev,
      [name]: true
    }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateIntegration(name, {
        status: 'Not Connected',
        apiKey: '',
        lastSync: 'Never'
      });
      setMessage({
        text: `Successfully disconnected from ${name}`,
        type: 'success'
      });
    } catch (error) {
      setMessage({
        text: `Failed to disconnect from ${name}`,
        type: 'error'
      });
    } finally {
      setLoading(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  const handleRotateKey = async (name: string) => {
    setLoading(prev => ({
      ...prev,
      [name]: true
    }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateIntegration(name, {
        apiKey: `${name.toLowerCase()}_${Math.random().toString(36).substring(7)}`,
        lastSync: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });
      setMessage({
        text: `Successfully rotated API key for ${name}`,
        type: 'success'
      });
    } catch (error) {
      setMessage({
        text: `Failed to rotate API key for ${name}`,
        type: 'error'
      });
    } finally {
      setLoading(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  const handleSettingsSave = async () => {
    setLoading(prev => ({
      ...prev,
      settings: true
    }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({
        text: 'Settings saved successfully',
        type: 'success'
      });
    } catch (error) {
      setMessage({
        text: 'Failed to save settings',
        type: 'error'
      });
    } finally {
      setLoading(prev => ({
        ...prev,
        settings: false
      }));
    }
  };
  return <div>
      <PageHeader title="API Settings" description="Manage API integrations and credentials for external security services." />
      {message && <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
          <p className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </p>
        </div>}
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <KeyIcon className="text-yellow-500 mr-2" size={20} />
          <h2 className="text-lg font-semibold">API Integrations</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {integrations.map(integration => <div key={integration.name} className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <ShieldIcon className="text-blue-500 mr-2" size={20} />
                  <h3 className="font-semibold">{integration.name}</h3>
                  <span className="ml-2 flex items-center">
                    {getStatusIcon(integration.status)}
                    <span className={`ml-1 text-sm ${integration.status === 'Connected' ? 'text-green-500' : integration.status === 'Error' ? 'text-red-500' : 'text-gray-500'}`}>
                      {integration.status}
                    </span>
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  {integration.description}
                </p>
                <div className="text-sm text-gray-500">
                  Last sync: {integration.lastSync}
                </div>
              </div>
              <div className="flex flex-col md:items-end">
                {integration.status === 'Connected' ? <>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-400 mr-2">
                        API Key:
                      </span>
                      <code className="bg-gray-900 px-2 py-1 rounded text-sm">
                        {showApiKey[integration.name] ? integration.apiKey : '•'.repeat(10)}
                      </code>
                      <button onClick={() => setShowApiKey(prev => ({
                  ...prev,
                  [integration.name]: !prev[integration.name]
                }))} className="ml-2 text-gray-400 hover:text-gray-300">
                        {showApiKey[integration.name] ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleRotateKey(integration.name)} disabled={loading[integration.name]} className="bg-blue-600 text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                        {loading[integration.name] && <Loader2Icon className="animate-spin mr-2" size={16} />}
                        Rotate Key
                      </button>
                      <button onClick={() => handleDisconnect(integration.name)} disabled={loading[integration.name]} className="bg-red-600 text-sm px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                        {loading[integration.name] && <Loader2Icon className="animate-spin mr-2" size={16} />}
                        Disconnect
                      </button>
                    </div>
                  </> : <div className="flex items-center space-x-2">
                    <input type={showApiKey[integration.name] ? 'text' : 'password'} placeholder="Enter API Key" className="bg-gray-900 px-3 py-2 rounded text-sm" onChange={e => setIntegrations(prev => prev.map(i => i.name === integration.name ? {
                ...i,
                apiKey: e.target.value
              } : i))} />
                    <button onClick={() => setShowApiKey(prev => ({
                ...prev,
                [integration.name]: !prev[integration.name]
              }))} className="text-gray-400 hover:text-gray-300">
                      {showApiKey[integration.name] ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                    <button onClick={() => handleConnect(integration.name, integration.apiKey)} disabled={!integration.apiKey || loading[integration.name]} className="bg-green-600 text-sm px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                      {loading[integration.name] && <Loader2Icon className="animate-spin mr-2" size={16} />}
                      Connect
                    </button>
                  </div>}
              </div>
            </div>)}
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">API Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Request Timeout (seconds)
            </label>
            <input type="number" className="bg-gray-800 rounded px-3 py-2 w-full max-w-xs" value={settings.timeout} onChange={e => setSettings(prev => ({
            ...prev,
            timeout: Number(e.target.value)
          }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Retry Attempts
            </label>
            <input type="number" className="bg-gray-800 rounded px-3 py-2 w-full max-w-xs" value={settings.retryAttempts} onChange={e => setSettings(prev => ({
            ...prev,
            retryAttempts: Number(e.target.value)
          }))} />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enableCache" className="rounded bg-gray-800" checked={settings.enableCache} onChange={e => setSettings(prev => ({
            ...prev,
            enableCache: e.target.checked
          }))} />
            <label htmlFor="enableCache" className="text-sm font-medium">
              Enable API Response Caching
            </label>
          </div>
          <div className="pt-4">
            <button onClick={handleSettingsSave} disabled={loading.settings} className="bg-blue-600 text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
              {loading.settings && <Loader2Icon className="animate-spin mr-2" size={16} />}
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>;
}