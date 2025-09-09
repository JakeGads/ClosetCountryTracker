import { Country } from '@/data/countries';
import { formatDistance } from '@/utils/distance';

interface CountryResultProps {
  country: Country;
  distance: number;
  rank: number;
}

export function CountryResult({ country, distance, rank }: CountryResultProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0">
        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
          {rank}
        </span>
      </div>
      
      <div className="flex-shrink-0">
        <img
          src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
          alt={`${country.name} flag`}
          className="w-10 h-7 object-cover rounded border"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/placeholder/40/28'; // Fallback image
          }}
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{country.name}</h3>
        <p className="text-sm text-gray-600">
          {country.latitude.toFixed(4)}°, {country.longitude.toFixed(4)}°
        </p>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <p className="font-medium text-gray-900">{formatDistance(distance)}</p>
        <p className="text-xs text-gray-500">away</p>
      </div>
    </div>
  );
}
