# Closest Countries Finder

A modern web application that finds the 5 closest countries to any given longitude and latitude coordinates, complete with country flags and distance calculations.

## Features

- 🌍 **Coordinate Input**: Enter any valid latitude and longitude coordinates
- 📍 **Current Location**: Use your device's geolocation to get your current coordinates
- 🏁 **Country Flags**: Display flags for each country using the flagcdn.com API
- 📏 **Distance Calculation**: Accurate distance calculations using the Haversine formula
- 📱 **Responsive Design**: Beautiful, mobile-friendly interface built with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js and optimized for speed

## How It Works

1. Enter latitude and longitude coordinates (or use your current location)
2. The app calculates the distance from your coordinates to all 195 countries
3. Displays the 5 closest countries with their flags, coordinates, and distances
4. Results are sorted by distance and beautifully presented

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects
- **Geolocation API** - Browser location services
- **flagcdn.com** - Country flag images

## Project Structure

```
src/
├── app/
│   ├── api/placeholder/     # Fallback flag images
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   └── CountryResult.tsx    # Country result card component
├── data/
│   └── countries.ts         # Country data with coordinates
└── utils/
    └── distance.ts          # Distance calculation utilities
```

## Key Features Explained

### Distance Calculation
Uses the Haversine formula to calculate the great-circle distance between two points on Earth, providing accurate results in kilometers.

### Country Data
Contains comprehensive data for 195 countries with their center coordinates and ISO 3166-1 alpha-2 codes for flag display.

### Responsive Design
Built with mobile-first approach using Tailwind CSS, ensuring great user experience across all devices.

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
