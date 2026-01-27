# 🌍 World Flags Explorer

An interactive React application to explore countries, flags, and detailed information from around the world using the REST Countries API.

## 📋 Features

### Core Features
- **Large Flag Gallery**: Browse all countries with their flags
- **Search Functionality**: Filter countries by name in real-time
- **Region Filter**: Browse countries by continent (Africa, Americas, Asia, Europe, Oceania)
- **Color Filter**: Filter flags by dominant colors (Red, Blue, White, Green, Yellow, Black, Orange)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Pagination**: Navigate through 12 countries per page

### Bonus Features
- **Country Detail Page**: View comprehensive information about each country
  - Flag (SVG format)
  - Official and common names
  - Population with formatted numbers
  - Region and subregion
  - Capital city
  - Country codes
- **Sorting**: Countries are sorted by population (descending)
- **Quick Facts**: Population density and country statistics
- **Smooth Navigation**: Easy navigation between list and detail views

## 🛠️ Technologies Used

### Frontend
- **React 18**: Latest React with hooks for state management
- **TypeScript**: Type-safe development
- **React Router DOM**: Client-side navigation
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Beautiful, consistent icon set

### API
- **REST Countries API v3.1**: Comprehensive country data
- **Axios**: HTTP client for API requests

### Build Tool
- **Vite**: Modern, fast build tool with HMR (Hot Module Replacement)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Install dependencies** (already done):
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open your browser** and navigate to:
```
http://localhost:5173
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── SearchBar.tsx    # Search input with icon
│   ├── FlagList.tsx     # Grid list of flag cards with pagination
│   ├── FlagCard.tsx     # Individual country flag card
│   └── ColorFilter.tsx  # Checkbox filter for flag colors
├── pages/              # Page components
│   ├── Home.tsx        # Main page with filters and list
│   └── CountryDetail.tsx # Detailed country information page
├── services/           # API services
│   └── countryService.ts # REST Countries API integration
├── App.tsx            # Main app with routing
├── index.css          # Global styles with Tailwind
└── main.tsx           # React entry point
```

## 🎯 Component Architecture

### SearchBar Component
- Controlled input with search icon
- Real-time filtering capability
- Customizable placeholder

### FlagCard Component
- Displays country flag, name, and code
- Hover effects for interactivity
- Click handler for navigation

### FlagList Component
- Responsive grid layout (1-4 columns)
- Pagination with previous/next buttons
- Loading state
- Empty state handling

### ColorFilter Component
- Multiple checkbox selection
- Clear all functionality
- Color name mapping

## 🔧 API Service

The `countryService` module provides:
- `getAllCountries()` - Fetch all countries
- `getCountryByCode(code)` - Get specific country details
- `searchCountries(query)` - Search by country name
- `getCountriesByRegion(region)` - Filter by region

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: Single column layout
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns
- **Large screens**: Sticky sidebar filters

## 🚀 Available Scripts

### Development
```bash
npm run dev
```
Start the Vite development server with HMR.

### Build
```bash
npm run build
```
Create an optimized production build.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Lint
```bash
npm run lint
```
Run ESLint for code quality.

## 🎨 Styling

- **TailwindCSS**: Utility-first CSS for rapid UI development
- **Responsive Classes**: Mobile-first approach with responsive prefixes
- **Custom Colors**: Tailored color scheme for better UX
- **Hover Effects**: Interactive elements with smooth transitions

## 🌐 API Integration

The application uses the **REST Countries API v3.1**:
- Base URL: `https://restcountries.com/v3.1`
- Endpoints:
  - `/all` - All countries
  - `/alpha/{code}` - Single country by code
  - `/name/{query}` - Search by name
  - `/region/{region}` - Filter by region

## 💡 Usage Examples

### Search Countries
1. Type in the search bar to filter by country name
2. Results update in real-time

### Filter by Region
1. Select a region from the sidebar
2. View only countries in that continent

### View Country Details
1. Click on any flag card
2. View comprehensive country information
3. Click "Back" to return to the list

### Pagination
1. Navigate through pages using Previous/Next buttons
2. Jump to specific page numbers
3. Shows 12 countries per page

## 🔮 Future Enhancements

- [ ] Infinite scroll as alternative to pagination
- [ ] Sorting options (by name, population, area)
- [ ] Multiple country comparison
- [ ] Flag color detection using image analysis
- [ ] Favorite countries (localStorage)
- [ ] Dark mode toggle
- [ ] Multiple language support
- [ ] Related countries suggestions
- [ ] Currency and timezone information
- [ ] Language information

## 📝 Notes

- The color filter is currently a placeholder. For actual color detection, you would need to implement image analysis using libraries like `node-vibrant` or similar.
- The API provides free access without authentication
- Consider implementing caching for better performance with large datasets

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

For issues or questions, please open an issue in the repository.

---

**Happy Exploring! 🌍✨**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
