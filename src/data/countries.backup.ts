import { Feature, Geometry, Polygon, MultiPolygon } from 'geojson';

export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2 code for flags  
  latitude: number; // Center point latitude (for display)
  longitude: number; // Center point longitude (for display)
  geometry?: Geometry; // GeoJSON geometry for precise boundary calculation
}

export interface CountryGeoJSON extends Feature {
  properties: {
    name: string;
    code: string;
    [key: string]: any;
  };
  geometry: Polygon | MultiPolygon;
}

export const countries: Country[] = [
  { name: "Afghanistan", code: "AF", latitude: 33.93911, longitude: 67.709953 },
  { name: "Albania", code: "AL", latitude: 41.153332, longitude: 20.168331 },
  { name: "Algeria", code: "DZ", latitude: 28.033886, longitude: 1.659626 },
  { name: "Andorra", code: "AD", latitude: 42.546245, longitude: 1.601554 },
  { name: "Angola", code: "AO", latitude: -11.202692, longitude: 17.873887 },
  { name: "Argentina", code: "AR", latitude: -38.416097, longitude: -63.616672 },
  { name: "Armenia", code: "AM", latitude: 40.069099, longitude: 45.038189 },
  { name: "Australia", code: "AU", latitude: -25.274398, longitude: 133.775136 },
  { name: "Austria", code: "AT", latitude: 47.516231, longitude: 14.550072 },
  { name: "Azerbaijan", code: "AZ", latitude: 40.143105, longitude: 47.576927 },
  { name: "Bahamas", code: "BS", latitude: 25.03428, longitude: -77.39628 },
  { name: "Bahrain", code: "BH", latitude: 25.930414, longitude: 50.637772 },
  { name: "Bangladesh", code: "BD", latitude: 23.684994, longitude: 90.356331 },
  { name: "Barbados", code: "BB", latitude: 13.193887, longitude: -59.543198 },
  { name: "Belarus", code: "BY", latitude: 53.709807, longitude: 27.953389 },
  { name: "Belgium", code: "BE", latitude: 50.503887, longitude: 4.469936 },
  { name: "Belize", code: "BZ", latitude: 17.189877, longitude: -88.49765 },
  { name: "Benin", code: "BJ", latitude: 9.30769, longitude: 2.315834 },
  { name: "Bhutan", code: "BT", latitude: 27.514162, longitude: 90.433601 },
  { name: "Bolivia", code: "BO", latitude: -16.290154, longitude: -63.588653 },
  { name: "Bosnia and Herzegovina", code: "BA", latitude: 43.915886, longitude: 17.679076 },
  { name: "Botswana", code: "BW", latitude: -22.328474, longitude: 24.684866 },
  { name: "Brazil", code: "BR", latitude: -14.235004, longitude: -51.92528 },
  { name: "Brunei", code: "BN", latitude: 4.535277, longitude: 114.727669 },
  { name: "Bulgaria", code: "BG", latitude: 42.733883, longitude: 25.48583 },
  { name: "Burkina Faso", code: "BF", latitude: 12.238333, longitude: -1.561593 },
  { name: "Burundi", code: "BI", latitude: -3.373056, longitude: 29.918886 },
  { name: "Cambodia", code: "KH", latitude: 12.565679, longitude: 104.990963 },
  { name: "Cameroon", code: "CM", latitude: 7.369722, longitude: 12.354722 },
  { 
    name: "Canada", 
    code: "CA", 
    latitude: 56.130366, 
    longitude: -106.346771,
    borderPoints: [
      // Arctic
      { lat: 83.1139, lng: -75.7667 }, // Ellesmere Island
      { lat: 78.9167, lng: -103.75 }, // Banks Island
      { lat: 69.5348, lng: -133.0482 }, // Arctic coast
      // Alaska border
      { lat: 69.6472, lng: -141.0033 },
      { lat: 60.0000, lng: -141.0033 },
      // West Coast
      { lat: 54.3578, lng: -130.3200 }, // BC coast
      { lat: 49.3829, lng: -123.2944 }, // Vancouver
      { lat: 48.9994, lng: -124.7842 }, // US border
      // Prairies/US border
      { lat: 49.0000, lng: -95.1544 },
      { lat: 49.0000, lng: -123.0000 },
      // Great Lakes
      { lat: 46.5197, lng: -84.3364 },
      { lat: 45.0000, lng: -74.7097 },
      // East Coast
      { lat: 47.0379, lng: -65.7421 }, // New Brunswick
      { lat: 46.8139, lng: -71.2080 }, // Quebec
      { lat: 51.9253, lng: -55.6066 }, // Newfoundland
      // Hudson Bay
      { lat: 58.7669, lng: -94.1692 }
    ]
  },
  { name: "Cape Verde", code: "CV", latitude: 16.002082, longitude: -24.013197 },
  { name: "Central African Republic", code: "CF", latitude: 6.611111, longitude: 20.939444 },
  { name: "Chad", code: "TD", latitude: 15.454166, longitude: 18.732207 },
  { name: "Chile", code: "CL", latitude: -35.675147, longitude: -71.542969 },
  { name: "China", code: "CN", latitude: 35.86166, longitude: 104.195397 },
  { name: "Colombia", code: "CO", latitude: 4.570868, longitude: -74.297333 },
  { name: "Comoros", code: "KM", latitude: -11.875001, longitude: 43.872219 },
  { name: "Congo", code: "CG", latitude: -0.228021, longitude: 15.827659 },
  { name: "Congo (Democratic Republic)", code: "CD", latitude: -4.038333, longitude: 21.758664 },
  { name: "Costa Rica", code: "CR", latitude: 9.748917, longitude: -83.753428 },
  { name: "Croatia", code: "HR", latitude: 45.1, longitude: 15.2 },
  { name: "Cuba", code: "CU", latitude: 21.521757, longitude: -77.781167 },
  { name: "Cyprus", code: "CY", latitude: 35.126413, longitude: 33.429859 },
  { name: "Czech Republic", code: "CZ", latitude: 49.817492, longitude: 15.472962 },
  { name: "Denmark", code: "DK", latitude: 56.26392, longitude: 9.501785 },
  { name: "Djibouti", code: "DJ", latitude: 11.825138, longitude: 42.590275 },
  { name: "Dominica", code: "DM", latitude: 15.414999, longitude: -61.370976 },
  { name: "Dominican Republic", code: "DO", latitude: 18.735693, longitude: -70.162651 },
  { name: "Ecuador", code: "EC", latitude: -1.831239, longitude: -78.183406 },
  { name: "Egypt", code: "EG", latitude: 26.820553, longitude: 30.802498 },
  { name: "El Salvador", code: "SV", latitude: 13.794185, longitude: -88.89653 },
  { name: "Equatorial Guinea", code: "GQ", latitude: 1.650801, longitude: 10.267895 },
  { name: "Eritrea", code: "ER", latitude: 15.179384, longitude: 39.782334 },
  { name: "Estonia", code: "EE", latitude: 58.595272, longitude: 25.013607 },
  { name: "Eswatini", code: "SZ", latitude: -26.522503, longitude: 31.465866 },
  { name: "Ethiopia", code: "ET", latitude: 9.145, longitude: 40.489673 },
  { name: "Fiji", code: "FJ", latitude: -16.578193, longitude: 179.414413 },
  { name: "Finland", code: "FI", latitude: 61.92411, longitude: 25.748151 },
  { name: "France", code: "FR", latitude: 46.227638, longitude: 2.213749 },
  { name: "Gabon", code: "GA", latitude: -0.803689, longitude: 11.609444 },
  { name: "Gambia", code: "GM", latitude: 13.443182, longitude: -15.310139 },
  { name: "Georgia", code: "GE", latitude: 42.315407, longitude: 43.356892 },
  { name: "Germany", code: "DE", latitude: 51.165691, longitude: 10.451526 },
  { name: "Ghana", code: "GH", latitude: 7.946527, longitude: -1.023194 },
  { name: "Greece", code: "GR", latitude: 39.074208, longitude: 21.824312 },
  { name: "Grenada", code: "GD", latitude: 12.262776, longitude: -61.604171 },
  { name: "Guatemala", code: "GT", latitude: 15.783471, longitude: -90.230759 },
  { name: "Guinea", code: "GN", latitude: 9.945587, longitude: -9.696645 },
  { name: "Guinea-Bissau", code: "GW", latitude: 11.803749, longitude: -15.180413 },
  { name: "Guyana", code: "GY", latitude: 4.860416, longitude: -58.93018 },
  { name: "Haiti", code: "HT", latitude: 18.971187, longitude: -72.285215 },
  { name: "Honduras", code: "HN", latitude: 15.199999, longitude: -86.241905 },
  { name: "Hungary", code: "HU", latitude: 47.162494, longitude: 19.503304 },
  { name: "Iceland", code: "IS", latitude: 64.963051, longitude: -19.020835 },
  { name: "India", code: "IN", latitude: 20.593684, longitude: 78.96288 },
  { name: "Indonesia", code: "ID", latitude: -0.789275, longitude: 113.921327 },
  { name: "Iran", code: "IR", latitude: 32.427908, longitude: 53.688046 },
  { name: "Iraq", code: "IQ", latitude: 33.223191, longitude: 43.679291 },
  { name: "Ireland", code: "IE", latitude: 53.41291, longitude: -8.24389 },
  { name: "Israel", code: "IL", latitude: 31.046051, longitude: 34.851612 },
  { name: "Italy", code: "IT", latitude: 41.87194, longitude: 12.56738 },
  { name: "Jamaica", code: "JM", latitude: 18.109581, longitude: -77.297508 },
  { name: "Japan", code: "JP", latitude: 36.204824, longitude: 138.252924 },
  { name: "Jordan", code: "JO", latitude: 30.585164, longitude: 36.238414 },
  { name: "Kazakhstan", code: "KZ", latitude: 48.019573, longitude: 66.923684 },
  { name: "Kenya", code: "KE", latitude: -0.023559, longitude: 37.906193 },
  { name: "Kiribati", code: "KI", latitude: -3.370417, longitude: -168.734039 },
  { name: "Kuwait", code: "KW", latitude: 29.31166, longitude: 47.481766 },
  { name: "Kyrgyzstan", code: "KG", latitude: 41.20438, longitude: 74.766098 },
  { name: "Laos", code: "LA", latitude: 19.85627, longitude: 102.495496 },
  { name: "Latvia", code: "LV", latitude: 56.879635, longitude: 24.603189 },
  { name: "Lebanon", code: "LB", latitude: 33.854721, longitude: 35.862285 },
  { name: "Lesotho", code: "LS", latitude: -29.609988, longitude: 28.233608 },
  { name: "Liberia", code: "LR", latitude: 6.428055, longitude: -9.429499 },
  { name: "Libya", code: "LY", latitude: 26.3351, longitude: 17.228331 },
  { name: "Liechtenstein", code: "LI", latitude: 47.166, longitude: 9.555373 },
  { name: "Lithuania", code: "LT", latitude: 55.169438, longitude: 23.881275 },
  { name: "Luxembourg", code: "LU", latitude: 49.815273, longitude: 6.129583 },
  { name: "Madagascar", code: "MG", latitude: -18.766947, longitude: 46.869107 },
  { name: "Malawi", code: "MW", latitude: -13.254308, longitude: 34.301525 },
  { name: "Malaysia", code: "MY", latitude: 4.210484, longitude: 101.975766 },
  { name: "Maldives", code: "MV", latitude: 3.202778, longitude: 73.22068 },
  { name: "Mali", code: "ML", latitude: 17.570692, longitude: -3.996166 },
  { name: "Malta", code: "MT", latitude: 35.937496, longitude: 14.375416 },
  { name: "Marshall Islands", code: "MH", latitude: 7.131474, longitude: 171.184478 },
  { name: "Mauritania", code: "MR", latitude: 21.00789, longitude: -10.940835 },
  { name: "Mauritius", code: "MU", latitude: -20.348404, longitude: 57.552152 },
  { 
    name: "Mexico", 
    code: "MX", 
    latitude: 23.634501, 
    longitude: -102.552784,
    borderPoints: [
      // US Border
      { lat: 32.5387, lng: -114.7939 }, // Tijuana area
      { lat: 31.7619, lng: -106.4850 }, // Juarez area  
      { lat: 25.8378, lng: -97.3958 }, // Matamoros area
      // Gulf Coast
      { lat: 21.1619, lng: -97.2438 }, // Veracruz
      { lat: 18.5014, lng: -88.2963 }, // Yucatan
      // Caribbean/Belize border
      { lat: 18.4954, lng: -88.2963 },
      { lat: 17.8157, lng: -88.2963 },
      // Guatemala border
      { lat: 17.8157, lng: -92.2292 },
      { lat: 14.5389, lng: -92.2292 },
      // Pacific Coast
      { lat: 14.5389, lng: -92.2292 }, // Chiapas
      { lat: 16.8531, lng: -99.8237 }, // Acapulco
      { lat: 20.2085, lng: -105.2573 }, // Puerto Vallarta
      { lat: 24.1426, lng: -110.3128 }, // Cabo
      { lat: 32.6297, lng: -117.0835 } // Tijuana
    ]
  },
  { name: "Micronesia", code: "FM", latitude: 7.425554, longitude: 150.550812 },
  { name: "Moldova", code: "MD", latitude: 47.411631, longitude: 28.369885 },
  { name: "Monaco", code: "MC", latitude: 43.750298, longitude: 7.412841 },
  { name: "Mongolia", code: "MN", latitude: 46.862496, longitude: 103.846656 },
  { name: "Montenegro", code: "ME", latitude: 42.708678, longitude: 19.37439 },
  { name: "Morocco", code: "MA", latitude: 31.791702, longitude: -7.09262 },
  { name: "Mozambique", code: "MZ", latitude: -18.665695, longitude: 35.529562 },
  { name: "Myanmar", code: "MM", latitude: 21.913965, longitude: 95.956223 },
  { name: "Namibia", code: "NA", latitude: -22.95764, longitude: 18.49041 },
  { name: "Nauru", code: "NR", latitude: -0.522778, longitude: 166.931503 },
  { name: "Nepal", code: "NP", latitude: 28.394857, longitude: 84.124008 },
  { name: "Netherlands", code: "NL", latitude: 52.132633, longitude: 5.291266 },
  { name: "New Zealand", code: "NZ", latitude: -40.900557, longitude: 174.885971 },
  { name: "Nicaragua", code: "NI", latitude: 12.865416, longitude: -85.207229 },
  { name: "Niger", code: "NE", latitude: 17.607789, longitude: 8.081666 },
  { name: "Nigeria", code: "NG", latitude: 9.081999, longitude: 8.675277 },
  { name: "North Korea", code: "KP", latitude: 40.339852, longitude: 127.510093 },
  { name: "North Macedonia", code: "MK", latitude: 41.608635, longitude: 21.745275 },
  { name: "Norway", code: "NO", latitude: 60.472024, longitude: 8.468946 },
  { name: "Oman", code: "OM", latitude: 21.512583, longitude: 55.923255 },
  { name: "Pakistan", code: "PK", latitude: 30.375321, longitude: 69.345116 },
  { name: "Palau", code: "PW", latitude: 7.51498, longitude: 134.58252 },
  { name: "Palestine", code: "PS", latitude: 31.952162, longitude: 35.233154 },
  { name: "Panama", code: "PA", latitude: 8.537981, longitude: -80.782127 },
  { name: "Papua New Guinea", code: "PG", latitude: -6.314993, longitude: 143.95555 },
  { name: "Paraguay", code: "PY", latitude: -23.442503, longitude: -58.443832 },
  { name: "Peru", code: "PE", latitude: -9.189967, longitude: -75.015152 },
  { name: "Philippines", code: "PH", latitude: 12.879721, longitude: 121.774017 },
  { name: "Poland", code: "PL", latitude: 51.919438, longitude: 19.145136 },
  { name: "Portugal", code: "PT", latitude: 39.399872, longitude: -8.224454 },
  { name: "Qatar", code: "QA", latitude: 25.354826, longitude: 51.183884 },
  { name: "Romania", code: "RO", latitude: 45.943161, longitude: 24.96676 },
  { name: "Russia", code: "RU", latitude: 61.52401, longitude: 105.318756 },
  { name: "Rwanda", code: "RW", latitude: -1.940278, longitude: 29.873888 },
  { name: "Saint Kitts and Nevis", code: "KN", latitude: 17.357822, longitude: -62.782998 },
  { name: "Saint Lucia", code: "LC", latitude: 13.909444, longitude: -60.978893 },
  { name: "Saint Vincent and the Grenadines", code: "VC", latitude: 12.984305, longitude: -61.287228 },
  { name: "Samoa", code: "WS", latitude: -13.759029, longitude: -172.104629 },
  { name: "San Marino", code: "SM", latitude: 43.94236, longitude: 12.457777 },
  { name: "Sao Tome and Principe", code: "ST", latitude: 0.18636, longitude: 6.613081 },
  { name: "Saudi Arabia", code: "SA", latitude: 23.885942, longitude: 45.079162 },
  { name: "Senegal", code: "SN", latitude: 14.497401, longitude: -14.452362 },
  { name: "Serbia", code: "RS", latitude: 44.016521, longitude: 21.005859 },
  { name: "Seychelles", code: "SC", latitude: -4.679574, longitude: 55.491977 },
  { name: "Sierra Leone", code: "SL", latitude: 8.460555, longitude: -11.779889 },
  { name: "Singapore", code: "SG", latitude: 1.352083, longitude: 103.819836 },
  { name: "Slovakia", code: "SK", latitude: 48.669026, longitude: 19.699024 },
  { name: "Slovenia", code: "SI", latitude: 46.151241, longitude: 14.995463 },
  { name: "Solomon Islands", code: "SB", latitude: -9.64571, longitude: 160.156194 },
  { name: "Somalia", code: "SO", latitude: 5.152149, longitude: 46.199616 },
  { name: "South Africa", code: "ZA", latitude: -30.559482, longitude: 22.937506 },
  { name: "South Korea", code: "KR", latitude: 35.907757, longitude: 127.766922 },
  { name: "South Sudan", code: "SS", latitude: 6.877, longitude: 31.307 },
  { name: "Spain", code: "ES", latitude: 40.463667, longitude: -3.74922 },
  { name: "Sri Lanka", code: "LK", latitude: 7.873054, longitude: 80.771797 },
  { name: "Sudan", code: "SD", latitude: 12.862807, longitude: 30.217636 },
  { name: "Suriname", code: "SR", latitude: 3.919305, longitude: -56.027783 },
  { name: "Sweden", code: "SE", latitude: 60.128161, longitude: 18.643501 },
  { name: "Switzerland", code: "CH", latitude: 46.818188, longitude: 8.227512 },
  { name: "Syria", code: "SY", latitude: 34.802075, longitude: 38.996815 },
  { name: "Taiwan", code: "TW", latitude: 23.69781, longitude: 120.960515 },
  { name: "Tajikistan", code: "TJ", latitude: 38.861034, longitude: 71.276093 },
  { name: "Tanzania", code: "TZ", latitude: -6.369028, longitude: 34.888822 },
  { name: "Thailand", code: "TH", latitude: 15.870032, longitude: 100.992541 },
  { name: "Timor-Leste", code: "TL", latitude: -8.874217, longitude: 125.727539 },
  { name: "Togo", code: "TG", latitude: 8.619543, longitude: 0.824782 },
  { name: "Tonga", code: "TO", latitude: -21.178986, longitude: -175.198242 },
  { name: "Trinidad and Tobago", code: "TT", latitude: 10.691803, longitude: -61.222503 },
  { name: "Tunisia", code: "TN", latitude: 33.886917, longitude: 9.537499 },
  { name: "Turkey", code: "TR", latitude: 38.963745, longitude: 35.243322 },
  { name: "Turkmenistan", code: "TM", latitude: 38.969719, longitude: 59.556278 },
  { name: "Tuvalu", code: "TV", latitude: -7.109535, longitude: 177.64933 },
  { name: "Uganda", code: "UG", latitude: 1.373333, longitude: 32.290275 },
  { name: "Ukraine", code: "UA", latitude: 48.379433, longitude: 31.16558 },
  { name: "United Arab Emirates", code: "AE", latitude: 23.424076, longitude: 53.847818 },
  { name: "United Kingdom", code: "GB", latitude: 55.378051, longitude: -3.435973 },
  { 
    name: "United States", 
    code: "US", 
    latitude: 37.09024, 
    longitude: -95.712891,
    borderPoints: [
      // Alaska
      { lat: 64.0685, lng: -152.2782 },
      { lat: 67.5, lng: -141.0 }, // Alaska-Canada border
      // West Coast
      { lat: 48.9994, lng: -124.7842 }, // Washington
      { lat: 45.6387, lng: -124.0428 }, // Oregon
      { lat: 41.7509, lng: -124.2026 }, // California
      { lat: 32.5347, lng: -117.1347 }, // San Diego
      // Mexico border
      { lat: 32.5387, lng: -114.7939 }, // Arizona
      { lat: 31.7619, lng: -106.4850 }, // Texas
      { lat: 25.8378, lng: -97.3958 }, // Texas Gulf
      // Gulf Coast
      { lat: 29.7255, lng: -93.2273 }, // Louisiana
      { lat: 30.3960, lng: -87.8967 }, // Alabama
      { lat: 25.2866, lng: -80.8987 }, // Florida Keys
      // East Coast
      { lat: 25.7823, lng: -80.2994 }, // Miami
      { lat: 35.2271, lng: -75.7723 }, // Outer Banks
      { lat: 40.7589, lng: -73.9851 }, // New York
      { lat: 44.8097, lng: -66.9517 }, // Maine
      // Great Lakes
      { lat: 48.9951, lng: -95.1544 }, // Minnesota
      { lat: 46.5197, lng: -84.3364 }, // Michigan
      // Center points
      { lat: 39.8283, lng: -98.5795 }
    ]
  },
  { name: "Uruguay", code: "UY", latitude: -32.522779, longitude: -55.765835 },
  { name: "Uzbekistan", code: "UZ", latitude: 41.377491, longitude: 64.585262 },
  { name: "Vanuatu", code: "VU", latitude: -15.376706, longitude: 166.959158 },
  { name: "Vatican City", code: "VA", latitude: 41.902916, longitude: 12.453389 },
  { name: "Venezuela", code: "VE", latitude: 6.42375, longitude: -66.58973 },
  { name: "Vietnam", code: "VN", latitude: 14.058324, longitude: 108.277199 },
  { name: "Yemen", code: "YE", latitude: 15.552727, longitude: 48.516388 },
  { name: "Zambia", code: "ZM", latitude: -13.133897, longitude: 27.849332 },
  { name: "Zimbabwe", code: "ZW", latitude: -19.015438, longitude: 29.154857 }
];
