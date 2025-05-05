import React from 'react';
import { AlertTriangleIcon, EyeIcon } from 'lucide-react';
export function ThreatClassification() {
  return <div>
      <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangleIcon className="text-yellow-500 mt-1 mr-3" size={20} />
          <div>
            <p className="text-sm text-yellow-500 mb-2">
              Hugging Face API key not found. Advanced AI models will not be
              available.
            </p>
            <p className="text-sm text-gray-400">
              For enhanced threat analysis capabilities, please provide your
              Hugging Face API key. You can get a free API key at
              huggingface.co.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Once obtained, add it as an environment variable named
              HUGGINGFACE_API_KEY.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Enter Hugging Face API Key
          </label>
          <div className="flex">
            <input type="password" className="flex-1 bg-gray-800 rounded-l-md px-3 py-2 text-sm" placeholder="Enter API key" />
            <button className="bg-gray-800 px-3 py-2 rounded-r-md border-l border-gray-700">
              <EyeIcon size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Select AI Model
          </label>
          <select className="w-full bg-gray-800 text-gray-300 rounded-md px-3 py-2 text-sm">
            <option>
              facebook/bart-large-mnli - Zero-shot classification (best for new
              threat types)
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Enter threat description or indicator for classification
          </label>
          <textarea className="w-full bg-gray-800 rounded-md px-3 py-2 text-sm h-32" placeholder="Example: Multiple failed login attempts followed by successful authentication from foreign IP address" />
        </div>
        <button className="bg-blue-600 text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Classify Threat
        </button>
      </div>
    </div>;
}