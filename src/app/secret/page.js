'use client';

import { useState, useEffect } from 'react';

export default function SecretPage() {
  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the code from a server action/API route
    fetch('/api/get-code')
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setCode(data.code);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);



  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const displayValue = isVisible ? code : '•'.repeat(code.length);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Secret Code
        </h1>
        
        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">
              Loading...
            </p>
          </div>
        ) : code ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Code:
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 overflow-x-auto">
                  <span 
                    className="font-mono text-lg tracking-wider text-gray-800 block whitespace-nowrap"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {displayValue}
                  </span>
                </div>
                <button
                  onClick={toggleVisibility}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex-shrink-0"
                >
                  {isVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              The code has been removed from the URL for security.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">
              No secret code found. Please access this page with a valid code parameter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
