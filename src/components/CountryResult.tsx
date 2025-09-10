import Image from 'next/image';
import { Country } from '@/data/countries';
import { formatDistance } from '@/utils/distance';

interface CountryResultProps {
  country: Country;
  distance: number;
  rank: number;
}

export function CountryResult({ country, distance, rank }: CountryResultProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-yellow-200';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-gray-200';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 shadow-amber-200';
    return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-200';
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank.toString();
  };

  return (
    <div className="group flex items-center gap-3 sm:gap-5 p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/90">
      <div className="flex-shrink-0">
        <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl font-bold text-base sm:text-lg shadow-lg ${getRankColor(rank)}`}>
          {rank <= 3 ? getRankEmoji(rank) : rank}
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <div className="relative">
          <Image
            src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
            alt={`${country.name} flag`}
            width={48}
            height={32}
            className="w-10 h-7 sm:w-12 sm:h-8 object-cover rounded-lg border-2 border-white shadow-md group-hover:shadow-lg transition-shadow duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/48/32'; // Fallback image
            }}
          />
          <div className="absolute inset-0 rounded-lg ring-1 ring-black/10"></div>
        </div>
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className="font-bold text-base sm:text-lg text-gray-900 truncate mb-1 group-hover:text-blue-900 transition-colors">
          {country.name}
        </h3>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <p className="text-xs sm:text-sm text-gray-600 font-mono">
            {country.latitude.toFixed(2)}°, {country.longitude.toFixed(2)}°
          </p>
          <a
            href={`https://maps.google.com/?q=${country.latitude},${country.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded-lg flex-shrink-0"
            title="View on Google Maps"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 sm:p-3 border border-blue-100">
          <p className="font-bold text-lg sm:text-xl text-blue-900">{formatDistance(distance)}</p>
          <p className="text-xs text-blue-600 font-medium">away</p>
        </div>
      </div>
    </div>
  );
}
