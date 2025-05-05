import React, { useCallback, useState } from 'react';
import { UploadCloudIcon, Loader2Icon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
interface FileStatus {
  name: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  message?: string;
}
interface BulkFileUploadProps {
  onFilesSelect: (files: File[]) => void;
  isProcessing?: boolean;
  accept?: string[];
  maxSize?: number;
}
export function BulkFileUpload({
  onFilesSelect,
  isProcessing,
  accept = ['.csv'],
  maxSize = 20971520
}: BulkFileUploadProps) {
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      status: 'pending' as const
    }));
    setFileStatuses(newFiles);
    onFilesSelect(acceptedFiles);
  }, [onFilesSelect]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      'text/csv': accept
    },
    disabled: isProcessing,
    multiple: true
  });
  return <div>
      <div {...getRootProps()} className={`border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-700'} rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input {...getInputProps()} />
        <UploadCloudIcon size={36} className={`${isDragActive ? 'text-blue-500' : 'text-gray-500'} mb-2`} />
        <p className="text-sm text-gray-400 mb-1">
          {isDragActive ? 'Drop the files here' : 'Drag and drop multiple CSV files here or click to browse'}
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Supported files: threats.csv, vulnerabilities.csv, incidents.csv,
          compliance.csv
        </p>
        {!isDragActive && <button disabled={isProcessing} className="bg-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Browse files
          </button>}
      </div>
      {fileStatuses.length > 0 && <div className="mt-4 space-y-2">
          {fileStatuses.map(file => <div key={file.name} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              <span className="text-sm text-gray-300">{file.name}</span>
              <div className="flex items-center">
                {file.status === 'processing' && <Loader2Icon className="animate-spin" size={16} />}
                {file.status === 'success' && <span className="text-green-500 text-sm">✓</span>}
                {file.status === 'error' && <span className="text-red-500 text-sm">✗</span>}
                {file.message && <span className="ml-2 text-xs text-gray-400">
                    {file.message}
                  </span>}
              </div>
            </div>)}
        </div>}
    </div>;
}