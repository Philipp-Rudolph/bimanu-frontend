# Bimanu Frontend

A Vue 3 web application for finding gas stations in Cologne, Germany. Built with modern tools and featuring location-based search and filtering capabilities.

## 🚀 Features

- **Station Search**: Find gas stations by name or address
- **Location-based Filtering**: Filter stations by proximity to your location
- **Responsive Design**: Mobile-friendly interface with modern styling
- **Real-time Data**: Fetches station data from backend API
- **Interactive Map Links**: Direct links to Google Maps for navigation

## 🛠️ Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: SCSS with custom design system
- **Linting**: ESLint with Vue plugin
- **Code Formatting**: Prettier
- **Development**: Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager
- Backend API running on port 3000 (for full functionality)

## 🏗️ Project Structure

```
src/
├── components/            # Reusable Vue components
│   ├── GeoFilter.vue      # Location-based filtering
│   ├── SearchBar.vue      # Text search functionality
│   ├── SortBar.vue        # Sorting controls
│   └── StationsList.vue   # Station results display
├── composables/           # Vue composables for shared logic
│   ├── api.js             # API communication
│   └── maps.js            # Map integration utilities
├── assets/                # Stylesheets and static assets
│   ├── globals.scss       # Global SCSS variables and mixins
│   └── styles.scss        # Base styles
├── App.vue                # Root component
└── main.js                # Application entry point
```

## 🛠️ Installation & Setup

Use the bimanu docker wrapper repository to run the application, including: 
- **PostgreSQL**: Database for storing gas station data
- **PostGIS**: Geospatial extension for PostgreSQL
- **Backend Service**: Node.js application for managing gas station data
- **Frontend Service**: Vue.js application for user interface
URL: [bimanu-docker](https://github.com/Philipp-Rudolph/bimanu-docker-wrapper.git)


## 🔧 Configuration

### Vite Configuration

The project uses custom Vite configuration with:
- **Port**: Development server runs on port 8082
- **Proxy**: API requests to `/api/*` are proxied to `http://backend:3000`
- **Alias**: `@` points to the `src` directory
- **SCSS**: Global variables automatically imported

### ESLint Configuration

- Vue 3 specific linting rules
- Prettier integration for consistent formatting
- Browser globals configured

## 🐳 Docker Support

The project includes Docker configuration:

- `Dockerfile`: Development container
- `Dockerfile.prod`: Production-optimized container

## 🌐 API Integration

The frontend communicates with a backend API for station data:

- **Base URL**: Configured via Vite proxy to `/api`
- **Expected Backend**: RESTful API on port 3000
- **Data Format**: Expects station objects with location and details

## 🎨 Styling

The project uses a custom SCSS design system with:

- **Variables**: Colors, spacing, typography defined in `globals.scss`
- **Responsive Design**: Mobile-first approach
- **Component Scoping**: Scoped styles in Vue components
- **Global Styles**: Base styles and utilities

## 🚨 Troubleshooting

### Common Issues

1. **Port 8082 already in use**
   - Kill existing process or change port in `vite.config.js`

2. **API requests failing**
   - Ensure backend is running on port 3000
   - Check proxy configuration in `vite.config.js`

3. **SCSS compilation errors**
   - Verify `sass-embedded` is installed
   - Check import paths in SCSS files

### Development Tips

- Use Vue DevTools browser extension for debugging
- Check browser console for API errors
- Lint code before committing: `npm run lint`

## 🔗 Related Projects

This frontend is part of the Bimanu project ecosystem and works in conjunction with the backend API for complete functionality.