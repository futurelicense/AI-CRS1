import React from 'react';
import { Link } from 'react-router-dom';
export function LandingPage() {
  return <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white" style={{
    backgroundImage: 'url("https://uploadthingy.s3.us-west-1.amazonaws.com/k5bnaKuK2HNgTs769P1gPE/AI-CRAS.jpg")',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundBlendMode: 'darken'
  }}>
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-6xl font-bold mb-6">
          AI Cyber Risk Assessment System
        </h1>
        <p className="text-xl mb-12">
          Access this incredible tools for security risk assessment
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">GitHub Source Code</h2>
            <p className="mb-6">Access source code and deploy solution</p>
            <a href="https://github.com/futurelicense/AI-CRS" target="_blank" rel="noopener noreferrer" className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Download Source Code
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Demo View</h2>
            <p className="mb-6">
              Access to have a mockup view on how AI-CRAS works
            </p>
            <Link to="/dashboard" className="inline-block bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>;
}