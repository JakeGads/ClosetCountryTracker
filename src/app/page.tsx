'use client';

import { useState } from 'react';
import { countries } from '@/data/countries';
import { validateCoordinates, calculateMinDistanceToCountry } from '@/utils/distance';
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
      .slice(0, 10);

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
        () => {
          setError('Unable to get your location. Please enter coordinates manually.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl mb-6 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4 leading-tight">
            Closest Countries Finder
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover the nearest countries to any location on Earth with precise border-based distance calculations
          </p>
        </header>

        <main className="flex flex-col items-center">
          <div className="w-full max-w-2xl bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 mb-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="latitude" className="block text-sm font-semibold text-gray-800 mb-3">
                    📍 Latitude
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 40.7128"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg bg-white/80 backdrop-blur-sm"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">Range: -90 to 90</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="longitude" className="block text-sm font-semibold text-gray-800 mb-3">
                    🌐 Longitude
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., -74.0060"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg bg-white/80 backdrop-blur-sm"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">Range: -180 to 180</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Calculating...
                    </span>
                  ) : (
                    '🔍 Find Closest Countries'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLoading}
                  className="sm:flex-none bg-white/80 backdrop-blur-sm text-gray-700 py-4 px-8 rounded-xl font-semibold text-base sm:text-lg border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-4 focus:ring-gray-500/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:transform-none"
                >
                  📍 Use My Location
                </button>
              </div>
            </form>
          </div>

          {results.length > 0 && (
            <div className="w-full max-w-3xl bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
                  🌍 10 Closest Countries
                </h2>
                <p className="text-gray-600">Ranked by distance to their borders</p>
              </div>
              
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div
                    key={result.country.code}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CountryResult
                      country={result.country}
                      distance={result.distance}
                      rank={index + 1}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200/60">
                <div className="flex items-center justify-center gap-3 text-gray-600 bg-gray-50/50 rounded-xl p-4">
                  <span className="text-sm">📍 Your Location: {parseFloat(latitude).toFixed(4)}°, {parseFloat(longitude).toFixed(4)}°</span>
                  <a
                    href={`https://maps.google.com/?q=${parseFloat(latitude)},${parseFloat(longitude)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded-lg"
                    title="View your location on Google Maps"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
          {isLoading && !results.length && (
            <div className="w-full max-w-2xl bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-12 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">🔍 Calculating Distances</h3>
                  <p className="text-gray-600">Analyzing borders of 195+ countries...</p>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="text-center mt-16 text-gray-500 text-sm space-y-2 w-full flex justify-center">
          <div className="max-w-2xl bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <p className="mb-2">Built with ❤️ using Next.js and Tailwind CSS</p>
            <p className="text-xs">
              Flags from <a href="https://flagcdn.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">flagcdn.com</a> • 
              Data provided by <a href="https://geojson-maps.kyd.au/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">GeoJson.maps</a>
            </p>
            <p className="text-xs mt-2">
              Made and maintained by <a href="https://github.com/jakegads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">Jake Gads</a>
            </p>
          </div>
        </footer>
      </div> 
    </div>
  );
}
