import React, { useCallback, useState, createElement } from 'react';
import { PageHeader } from '../components/UI/PageHeader';
import { UploadCloudIcon, DownloadIcon, Loader2Icon } from 'lucide-react';
import { FileUpload } from '../components/UI/FileUpload';
import { BulkFileUpload } from '../components/UI/BulkFileUpload';
import { useData } from '../context/DataContext';
import { processCsvFile, generateCsvTemplate, generateSampleCsv, processBulkCsvFiles } from '../utils/dataProcessing';
type DataType = 'threats' | 'vulnerabilities' | 'incidents';
export function DataManagement() {
  const {
    threats,
    vulnerabilities,
    incidents,
    updateThreats,
    updateVulnerabilities,
    updateIncidents,
    resetToSampleData
  } = useData();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DataType>('threats');
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
  }, []);
  const processData = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const processedData = await processCsvFile(selectedFile, activeTab);
      console.log('Processed data:', processedData); // Debug log
      switch (activeTab) {
        case 'threats':
          updateThreats(processedData);
          console.log('Updated threats:', processedData); // Debug log
          break;
        case 'vulnerabilities':
          updateVulnerabilities(processedData);
          break;
        case 'incidents':
          updateIncidents(processedData);
          break;
      }
      setSelectedFile(null);
      // Show success message
      setError('Data successfully uploaded and processed!');
      // Wait a bit before clearing success message
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };
  const downloadTemplate = () => {
    const csvContent = generateCsvTemplate(activeTab);
    const blob = new Blob([csvContent], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  const downloadSampleData = () => {
    const csvContent = generateSampleCsv(activeTab);
    const blob = new Blob([csvContent], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample_${activeTab}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  const getCurrentData = () => {
    switch (activeTab) {
      case 'threats':
        return threats;
      case 'vulnerabilities':
        return vulnerabilities;
      case 'incidents':
        return incidents;
      default:
        return [];
    }
  };
  const processBulkData = async (files: File[]) => {
    setIsBulkProcessing(true);
    setError(null);
    try {
      const results = await processBulkCsvFiles(files);
      // Update all data contexts
      if (results.threats) {
        updateThreats(results.threats);
      }
      if (results.vulnerabilities) {
        updateVulnerabilities(results.vulnerabilities);
      }
      if (results.incidents) {
        updateIncidents(results.incidents);
      }
      setError('All files successfully processed!');
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsBulkProcessing(false);
    }
  };
  return <div>
      <PageHeader title="Data Management" description="Upload your own CSV data files or use sample data provided by the system." />
      {/* Add new bulk upload section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Bulk Data Upload</h2>
        <div className="mb-6">
          <BulkFileUpload onFilesSelect={processBulkData} isProcessing={isBulkProcessing} />
        </div>
      </div>
      {/* Existing single file upload UI */}
      <div className="mb-6">
        <ul className="flex space-x-1 border-b border-gray-700">
          <li className={`pb-2 px-4 ${activeTab === 'threats' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'threats' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('threats')}>
              Threats
            </button>
          </li>
          <li className={`pb-2 px-4 ${activeTab === 'vulnerabilities' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'vulnerabilities' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('vulnerabilities')}>
              Vulnerabilities
            </button>
          </li>
          <li className={`pb-2 px-4 ${activeTab === 'incidents' ? 'border-b-2 border-red-500' : ''}`}>
            <button className={`text-sm font-medium ${activeTab === 'incidents' ? '' : 'text-gray-400'}`} onClick={() => setActiveTab('incidents')}>
              Incidents
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Current dataset: {getCurrentData().length} records
        </p>
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">
            Upload {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} CSV
          </h3>
          <div className="flex space-x-4 mb-4">
            <button onClick={downloadTemplate} className="flex items-center bg-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors">
              <DownloadIcon size={16} className="mr-2" />
              Download Empty Template
            </button>
            <button onClick={downloadSampleData} className="flex items-center bg-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors">
              <DownloadIcon size={16} className="mr-2" />
              Download Sample Data
            </button>
          </div>
          <FileUpload onFileSelect={handleFileSelect} isLoading={isProcessing} />
          {selectedFile && <p className="mt-2 text-sm text-gray-400">
              Selected file: {selectedFile.name}
            </p>}
          {error && <p className={`mt-2 text-sm ${error.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {error}
            </p>}
        </div>
        <div className="flex space-x-4 mb-6">
          <button onClick={processData} disabled={!selectedFile || isProcessing} className="flex items-center bg-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isProcessing && <Loader2Icon className="animate-spin mr-2" size={16} />}
            Process Uploaded Data
          </button>
          <button onClick={resetToSampleData} className="bg-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors">
            Reset to Sample Data
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Data Preview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800">
              <tr>
                {Object.keys(getCurrentData()[0] || {}).map(header => <th key={header} className="px-4 py-3">
                    {header}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              {getCurrentData().map(record => <tr key={record.id} className="border-b border-gray-800">
                  {Object.entries(record).map(([key, value]) => <td key={key} className="px-4 py-3">
                      {value}
                    </td>)}
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button onClick={downloadTemplate} className="flex items-center bg-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors">
            <DownloadIcon size={16} className="mr-2" />
            Download Template CSV
          </button>
        </div>
      </div>
    </div>;
}