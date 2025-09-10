import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "🌍 Closest Countries Finder",
  description: "Discover the nearest countries to any location on Earth with precise border-based distance calculations. Built with Next.js and advanced geospatial algorithms.",
  keywords: ["countries", "distance", "geography", "coordinates", "geolocation", "travel", "maps"],
  authors: [{ name: "Jake Gads", url: "https://github.com/jakegads" }],
  creator: "Jake Gads",
  openGraph: {
    title: "🌍 Closest Countries Finder",
    description: "Discover the nearest countries to any location on Earth",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "🌍 Closest Countries Finder",
    description: "Discover the nearest countries to any location on Earth",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
