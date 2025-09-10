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
  country: { name: string; latitude: number; longitude: number; geometry?: any }
): number {
  // If the country has GeoJSON geometry, use it for more accurate distance calculation
  if (country.geometry) {
    return calculateDistanceToGeoJSONGeometry(userLat, userLng, country.geometry);
  }
  
  // Fallback to generated border points
  const borderPoints = generateBorderPoints(country.latitude, country.longitude, country.name);
  
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

/**
 * Calculate distance from a point to a GeoJSON geometry
 * For polygons, this calculates the distance to the nearest edge
 */
export function calculateDistanceToGeoJSONGeometry(
  userLat: number,
  userLng: number,
  geometry: any
): number {
  try {
    const turf = require('@turf/turf');
    const userPoint = turf.point([userLng, userLat]);
    
    if (geometry.type === 'Polygon') {
      // For polygon, calculate distance to the boundary
      const polygon = turf.polygon(geometry.coordinates);
      
      // Check if point is inside the polygon
      if (turf.booleanPointInPolygon(userPoint, polygon)) {
        return 0; // If inside the country, distance is 0
      }
      
      // Calculate distance to the polygon boundary
      const boundary = turf.polygonToLine(polygon);
      const distance = turf.pointToLineDistance(userPoint, boundary, { units: 'kilometers' });
      return Math.round(distance * 100) / 100;
      
    } else if (geometry.type === 'MultiPolygon') {
      let minDistance = Infinity;
      
      // Check each polygon in the MultiPolygon
      for (const coordinates of geometry.coordinates) {
        const polygon = turf.polygon(coordinates);
        
        // Check if point is inside any polygon
        if (turf.booleanPointInPolygon(userPoint, polygon)) {
          return 0; // If inside any part of the country, distance is 0
        }
        
        // Calculate distance to this polygon's boundary
        const boundary = turf.polygonToLine(polygon);
        const distance = turf.pointToLineDistance(userPoint, boundary, { units: 'kilometers' });
        
        if (distance < minDistance) {
          minDistance = distance;
        }
      }
      
      return Math.round(minDistance * 100) / 100;
    }
    
    // Fallback for other geometry types
    return calculateDistanceToGeometryPoints(userLat, userLng, geometry);
    
  } catch (error) {
    console.warn('Error calculating GeoJSON distance, using fallback method:', error);
    return calculateDistanceToGeometryPoints(userLat, userLng, geometry);
  }
}

/**
 * Fallback method to calculate distance to geometry points
 */
function calculateDistanceToGeometryPoints(
  userLat: number,
  userLng: number,
  geometry: any
): number {
  let minDistance = Infinity;
  
  const processCoordinates = (coords: any): void => {
    if (Array.isArray(coords) && coords.length >= 2 && typeof coords[0] === 'number') {
      // This is a coordinate pair [lng, lat]
      const distance = calculateDistance(userLat, userLng, coords[1], coords[0]);
      if (distance < minDistance) {
        minDistance = distance;
      }
    } else if (Array.isArray(coords)) {
      // This is an array of coordinates, process recursively
      coords.forEach(processCoordinates);
    }
  };
  
  if (geometry.coordinates) {
    processCoordinates(geometry.coordinates);
  }
  
  return minDistance === Infinity ? 0 : Math.round(minDistance * 100) / 100;
}
