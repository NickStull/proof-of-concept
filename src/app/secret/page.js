'use client';

import { useState, useEffect } from 'react';

export default function SecretPage() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the location from the server-side cookie
    fetch('/api/get-code')
      .then(res => res.json())
      .then(data => {
        setLocation(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Scavenger Hunt
        </h1>
        
        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">
              Loading...
            </p>
          </div>
        ) : location?.found ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-center">
                <div className="text-3xl mb-2">🎉</div>
                <h2 className="text-xl font-bold text-green-800 mb-2">
                  Congratulations!
                </h2>
                <p className="text-lg text-green-700">
                  You found the <strong>{location.locationName}</strong>!
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Location ID: {location.locationId}
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              The location code has been securely processed.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-3xl mb-2">❌</div>
              <h2 className="text-lg font-bold text-red-800 mb-2">
                No Location Found
              </h2>
              <p className="text-red-700">
                Please access this page with a valid location code.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
