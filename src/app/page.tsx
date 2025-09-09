'use client';

import { useState } from 'react';
import { countries } from '@/data/countries';
import { calculateDistance, validateCoordinates, calculateMinDistanceToCountry } from '@/utils/distance';
import { CountryResult } from '@/components/CountryResult';

interface ClosestCountry {
  country: typeof countries[0];
  distance: number;
}

export default function Home() {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [results, setResults] = useState<ClosestCountry[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Validate input
    if (isNaN(lat) || isNaN(lon)) {
      setError('Please enter valid numbers for latitude and longitude.');
      setIsLoading(false);
      return;
    }

    if (!validateCoordinates(lat, lon)) {
      setError('Please enter valid coordinates (latitude: -90 to 90, longitude: -180 to 180).');
      setIsLoading(false);
      return;
    }

    // Calculate distances to all countries using border points
    const countriesWithDistances = countries.map(country => ({
      country,
      distance: calculateMinDistanceToCountry(lat, lon, country)
    }));

    // Sort by distance and take the closest 5
    const closest = countriesWithDistances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    setResults(closest);
    setIsLoading(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setIsLoading(false);
        },
        (error) => {
          setError('Unable to get your location. Please enter coordinates manually.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Closest Countries Finder</h1>
          <p className="text-lg text-gray-600">
            Enter your coordinates to find the closest countries based on distance to their borders
          </p>
        </header>

        <main>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 40.7128"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: -90 to 90</p>
                </div>
                
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., -74.0060"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: -180 to 180</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Calculating...' : 'Find Closest Countries'}
                </button>
                
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLoading}
                  className="sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Use My Location
                </button>
              </div>
            </form>
          </div>

          {results.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                5 Closest Countries
              </h2>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <CountryResult
                    key={result.country.code}
                    country={result.country}
                    distance={result.distance}
                    rank={index + 1}
                  />
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span>📍 Your Location: {parseFloat(latitude).toFixed(4)}°, {parseFloat(longitude).toFixed(4)}°</span>
                  <a
                    href={`https://maps.google.com/?q=${parseFloat(latitude)},${parseFloat(longitude)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors ml-1"
                    title="View your location on Google Maps"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with Next.js and Tailwind CSS • Flags from flagcdn.com</p>
        </footer>
      </div>
    </div>
  );
}
