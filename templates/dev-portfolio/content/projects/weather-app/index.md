---
title: "WeatherNow - Real-Time Weather App"
date: 2024-06-10
summary: "Beautiful weather application with real-time data, 7-day forecasts, and interactive maps"
tags:
  - Frontend
  - React
  - API Integration
  - PWA
tech_stack:
  - React
  - TypeScript
  - OpenWeather API
  - Mapbox
  - Tailwind CSS
  - Vite
links:
  - type: github
    url: https://github.com/alexjohnson/weather-now
    label: Code
  - type: live
    url: https://weathernow-demo.netlify.app
    label: Demo
featured: false
status: "Live"
role: "Solo Developer"
duration: "3 weeks"
team_size: 1
highlights:
  - "PWA with offline support"
  - "5000+ monthly active users"
  - "Lighthouse score: 100"
---

A fast, beautiful weather application that provides real-time weather data, forecasts, and interactive maps. Built as a Progressive Web App with offline support.

## Overview

WeatherNow started as a weekend project to learn PWA development. It evolved into a fully-featured weather app used by thousands of people daily.

## Features

### Weather Data
- **Current Conditions** - Real-time weather for any location
- **7-Day Forecast** - Detailed daily forecasts with hourly breakdown
- **Weather Alerts** - Severe weather notifications
- **Historical Data** - Past weather data and trends

### User Experience
- **Location Detection** - Automatic location based on GPS or IP
- **Search** - Find weather for any city worldwide
- **Favorites** - Save frequently checked locations
- **Units** - Toggle between metric and imperial
- **Dark Mode** - Automatic or manual theme switching

### Progressive Web App
- **Offline Support** - Access cached data without internet
- **Install** - Add to home screen like a native app
- **Fast** - Optimized for performance (Lighthouse 100)
- **Responsive** - Perfect on any device

## Technical Highlights

### Performance
- Achieved **100/100 Lighthouse score** across all categories
- Implemented service workers for offline functionality
- Optimized bundle size: < 150KB gzipped
- Lazy loading for images and components
- Prefetching for instant navigation

### Data Management
- Smart caching strategy with stale-while-revalidate
- Background sync for updated forecasts
- Efficient API usage with request batching
- Local storage for user preferences

### UI/UX
- Smooth animations with Framer Motion
- Interactive weather map with Mapbox
- Weather icons that match current conditions
- Accessible (WCAG AA compliant)

## API Integration

Integrated multiple weather APIs for comprehensive data:

```typescript
// Example: Fetching weather data
const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  return response.json()
}
```

## Architecture

```
┌─────────────┐     ┌──────────────┐
│  React App  │────▶│ OpenWeather  │
│   (Vite)    │     │     API      │
└──────┬──────┘     └──────────────┘
       │
       │            ┌──────────────┐
       └───────────▶│   Mapbox     │
                    │     API      │
                    └──────────────┘
```

## Challenges

### Challenge: API Rate Limits
**Solution**: Implemented intelligent caching and request batching to stay within free tier limits while maintaining data freshness

### Challenge: Offline Experience
**Solution**: Service workers with cache-first strategy for UI, network-first for data with graceful fallbacks

### Challenge: Performance on Slow Networks
**Solution**: Image optimization, code splitting, and Progressive rendering for instant perceived performance

## Results

- 📈 **Users**: 5000+ monthly active users
- ⚡ **Performance**: 100 Lighthouse score
- 📱 **PWA**: 40% of users installed as app
- 🌍 **Global**: Users from 50+ countries
- ⭐ **Rating**: 4.8/5 average user rating

## Tech Stack

**Frontend**
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite (build tool)

**APIs**
- OpenWeather API
- Mapbox GL JS
- IP Geolocation API

**Tools**
- Workbox (PWA)
- React Query (data fetching)
- Zustand (state management)

**Hosting**
- Netlify
- Cloudflare CDN

## Open Source

This project is open source and welcomes contributions!

**License**: MIT  
**GitHub**: [alexjohnson/weather-now](https://github.com/alexjohnson/weather-now)

## Lessons Learned

1. **PWAs are powerful**: Service workers enable app-like experiences on the web
2. **Performance matters**: Users notice and appreciate fast apps
3. **Caching strategy**: Critical for offline support and API cost management
4. **Simplicity wins**: Started with core features, added more based on user feedback

## Future Plans

- [ ] Weather widgets for websites
- [ ] Social features (share weather conditions)
- [ ] Weather photography integration
- [ ] Apple Watch & Android Wear apps
- [ ] Premium features (ad-free, extended forecasts)

---

**Status**: ✅ Live & Maintained  
**Try it**: [weathernow-demo.netlify.app](https://weathernow-demo.netlify.app)  
**GitHub**: [@alexjohnson/weather-now](https://github.com/alexjohnson/weather-now)
