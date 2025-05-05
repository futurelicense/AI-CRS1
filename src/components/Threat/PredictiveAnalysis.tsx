import React from 'react';
export function PredictiveAnalysis() {
  return <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-4">
          Prediction timeframe (days)
        </label>
        <div className="flex items-center space-x-4">
          <input type="range" min="1" max="90" defaultValue="7" className="w-full" />
          <span className="text-sm text-gray-400">7</span>
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Focus on specific threat categories
        </label>
        <select className="w-full bg-gray-800 text-gray-300 rounded-md px-3 py-2">
          <option>Choose an option</option>
        </select>
      </div>
      <button className="bg-blue-600 text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        Generate Prediction
      </button>
    </div>;
}