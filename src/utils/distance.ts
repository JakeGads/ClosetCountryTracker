/**
 * Calculate the distance between two points on Earth using the Haversine formula
 * @param lat1 Latitude of point 1 in degrees
 * @param lon1 Longitude of point 1 in degrees
 * @param lat2 Latitude of point 2 in degrees
 * @param lon2 Longitude of point 2 in degrees
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Validate latitude and longitude coordinates
 */
export function validateCoordinates(lat: number, lon: number): boolean {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

/**
 * Format distance for display
 */
export function formatDistance(distance: number): string {
  return `${distance.toLocaleString()} km`;
}

/**
 * Generate border points around a country's center point
 * Creates a rough approximation of border points by creating points in a radius around the center
 */
export function generateBorderPoints(centerLat: number, centerLng: number, countryName: string): Array<{ lat: number; lng: number }> {
  const points: Array<{ lat: number; lng: number }> = [];
  
  // Determine radius based on country size (rough approximation)
  let radius = getCountryRadius(countryName);
  
  // Generate 16 points around the center (every 22.5 degrees)
  for (let angle = 0; angle < 360; angle += 22.5) {
    const radians = toRadians(angle);
    
    // Calculate offset in degrees (rough approximation)
    const latOffset = (radius / 111) * Math.cos(radians); // 111 km per degree latitude
    const lngOffset = (radius / (111 * Math.cos(toRadians(centerLat)))) * Math.sin(radians);
    
    points.push({
      lat: centerLat + latOffset,
      lng: centerLng + lngOffset
    });
  }
  
  // Also include the center point
  points.push({ lat: centerLat, lng: centerLng });
  
  return points;
}

/**
 * Get approximate radius for a country in kilometers
 */
function getCountryRadius(countryName: string): number {
  // Large countries
  const largeCountries = ['Russia', 'Canada', 'United States', 'China', 'Brazil', 'Australia', 'India', 'Argentina', 'Kazakhstan', 'Algeria'];
  
  // Medium countries
  const mediumCountries = ['Mexico', 'Indonesia', 'Iran', 'Libya', 'Chad', 'Niger', 'Angola', 'Mali', 'South Africa', 'Colombia', 'Ethiopia', 'Bolivia', 'Mauritania', 'Egypt', 'Tanzania', 'Nigeria', 'Venezuela', 'Pakistan', 'Turkey', 'Mozambique', 'Zambia', 'Myanmar', 'Afghanistan', 'Somalia', 'Central African Republic', 'Ukraine', 'Madagascar', 'Botswana', 'Kenya', 'France', 'Yemen', 'Thailand', 'Spain', 'Turkmenistan', 'Cameroon', 'Papua New Guinea', 'Sweden', 'Uzbekistan', 'Morocco', 'Iraq'];
  
  if (largeCountries.includes(countryName)) {
    return 800; // ~800km radius for large countries
  } else if (mediumCountries.includes(countryName)) {
    return 400; // ~400km radius for medium countries
  } else {
    return 150; // ~150km radius for small countries
  }
}

/**
 * Calculate the minimum distance from a point to any of a country's border points
 */
export function calculateMinDistanceToCountry(
  userLat: number, 
  userLng: number, 
  country: { name: string; latitude: number; longitude: number; borderPoints?: Array<{ lat: number; lng: number }> }
): number {
  // Generate border points if they don't exist
  const borderPoints = country.borderPoints || generateBorderPoints(country.latitude, country.longitude, country.name);
  
  // Calculate distance to each border point and return the minimum
  let minDistance = Infinity;
  
  for (const point of borderPoints) {
    const distance = calculateDistance(userLat, userLng, point.lat, point.lng);
    if (distance < minDistance) {
      minDistance = distance;
    }
  }
  
  return minDistance;
}
