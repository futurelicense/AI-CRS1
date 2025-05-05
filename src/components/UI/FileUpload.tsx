import React, { useCallback, useState } from 'react';
import { UploadCloudIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
  accept?: string[];
  maxSize?: number;
}
export function FileUpload({
  onFileSelect,
  isLoading,
  accept = ['.csv'],
  maxSize = 20971520
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > maxSize) {
        setError('File size exceeds 20MB limit');
        return;
      }
      onFileSelect(file);
    }
  }, [maxSize, onFileSelect]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      'text/csv': accept
    },
    maxFiles: 1,
    disabled: isLoading
  });
  return <div>
      <div {...getRootProps()} className={`border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-700'} rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input {...getInputProps()} />
        <UploadCloudIcon size={36} className={`${isDragActive ? 'text-blue-500' : 'text-gray-500'} mb-2`} />
        <p className="text-sm text-gray-400 mb-1">
          {isDragActive ? 'Drop the file here' : 'Drag and drop file here or click to browse'}
        </p>
        <p className="text-xs text-gray-500 mb-4">Limit 20MB per file • CSV</p>
        {!isDragActive && <button disabled={isLoading} className="bg-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Browse files
          </button>}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>;
}