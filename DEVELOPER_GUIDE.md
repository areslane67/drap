# 🌍 World Flags Explorer - Developer Guide

## Project Summary

You now have a fully functional React application that explores countries and their flags using the REST Countries API. The application is built with modern technologies and follows React best practices.

---

## 🚀 Quick Start

### Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📊 Project Overview

### What's Included

✅ **React 18** with TypeScript for type-safe development
✅ **React Router** for client-side navigation
✅ **Tailwind CSS v4** for utility-first styling
✅ **Lucide React Icons** for beautiful icons
✅ **Axios** for API requests
✅ **Vite** for fast development and builds
✅ **REST Countries API v3.1** integration

### Directory Structure

```
src/
├── components/                 # Reusable UI Components
│   ├── SearchBar.tsx          # Search input component
│   ├── FlagList.tsx           # Paginated grid of flag cards
│   ├── FlagCard.tsx           # Individual country card
│   └── ColorFilter.tsx        # Color filter checkboxes
│
├── pages/                     # Page-level components
│   ├── Home.tsx              # Main listing page with filters
│   └── CountryDetail.tsx     # Detailed country view
│
├── services/                  # API services
│   └── countryService.ts     # REST Countries API wrapper
│
├── App.tsx                   # Main app with routing
├── main.tsx                  # React entry point
├── index.css                 # Global styles with Tailwind
└── App.css                   # App-specific styles
```

---

## 🎨 Feature Breakdown

### 1. Flag Gallery (Home Page)

**Features:**
- Display all world flags in a responsive grid
- Sort by population (descending)
- 12 countries per page with pagination
- Smooth hover effects
- Click to view country details

**File:** [src/pages/Home.tsx](src/pages/Home.tsx)

### 2. Search Bar

**Features:**
- Real-time search by country name
- Search icon from Lucide
- Debounced filtering
- Works with both common and official country names

**File:** [src/components/SearchBar.tsx](src/components/SearchBar.tsx)

### 3. Region Filter

**Features:**
- Filter countries by continent
- Options: Africa, Americas, Asia, Europe, Oceania
- Radio button selection
- "All Regions" option

**Implementation:** In [Home.tsx](src/pages/Home.tsx#L64)

### 4. Color Filter

**Features:**
- Filter by flag colors (Red, Blue, White, Green, Yellow, Black, Orange)
- Multiple selection with checkboxes
- Clear all button
- Currently a UI placeholder (for future color detection)

**File:** [src/components/ColorFilter.tsx](src/components/ColorFilter.tsx)

### 5. Country Detail Page

**Features:**
- Display flag as SVG
- Show official and common names
- Population with formatted numbers
- Region and subregion
- Capital city
- Country code
- Quick facts and statistics
- Back button for navigation

**File:** [src/pages/CountryDetail.tsx](src/pages/CountryDetail.tsx)

### 6. Responsive Design

**Breakpoints:**
- Mobile (1 column): < 640px
- Tablet (2 columns): 640px - 1024px
- Desktop (3 columns): 1024px - 1280px
- Large (4 columns): > 1280px

**Implementation:** Using Tailwind CSS grid classes with responsive prefixes

---

## 🔧 API Service

The `countryService` provides type-safe access to the REST Countries API:

```typescript
import { countryService, Country } from '../services/countryService';

// Get all countries
const countries = await countryService.getAllCountries();

// Get specific country
const france = await countryService.getCountryByCode('FR');

// Search countries
const results = await countryService.searchCountries('united');

// Get countries by region
const asia = await countryService.getCountriesByRegion('Asia');
```

**API Endpoints:**
- Base: `https://restcountries.com/v3.1`
- `/all` - All countries
- `/alpha/{code}` - Single country by ISO 3166-1 code
- `/name/{query}` - Search by country name
- `/region/{region}` - Filter by region

---

## 🛠️ Customization Guide

### Add New Filters

1. Create filter state in [Home.tsx](src/pages/Home.tsx)
2. Create filter UI component if needed
3. Add filter logic to `useEffect` that filters `countries`

Example: Adding sorting by name

```typescript
// In Home.tsx
const [sortBy, setSortBy] = useState<'name' | 'population'>('population');

// In useEffect filter logic
results.sort((a, b) => {
  if (sortBy === 'name') {
    return a.name.common.localeCompare(b.name.common);
  }
  return b.population - a.population;
});
```

### Change Colors/Styling

1. Modify Tailwind configuration in [tailwind.config.js](tailwind.config.js)
2. Update color classes in components
3. Rebuild with `npm run build`

### Implement Color Detection

Replace placeholder logic in [ColorFilter.tsx](src/components/ColorFilter.tsx):

```bash
npm install vibrant
```

Then analyze flag images:

```typescript
import Vibrant from 'vibrant';

async function detectFlagColors(imageUrl: string) {
  const palette = await Vibrant.from(imageUrl).getPalette();
  // Extract and use dominant colors
}
```

### Add New Pages

1. Create page component in `src/pages/`
2. Add route in [App.tsx](src/App.tsx)
3. Create navigation links in components

---

## 🚨 Troubleshooting

### Dev Server Won't Start
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Build Fails
```bash
# Check for TypeScript errors
npm run build

# Clear build cache
rm -r dist
npm run build
```

### API Not Loading
1. Check internet connection
2. Verify CORS settings
3. Check browser console for errors
4. API endpoint: `https://restcountries.com/v3.1`

### Styling Issues
1. Ensure TailwindCSS is properly configured
2. Check [index.css](src/index.css) has `@import "tailwindcss"`
3. Rebuild CSS: `npm run dev` (watches automatically)

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18 | UI library |
| react-dom | ^18 | React DOM renderer |
| react-router-dom | ^6 | Client routing |
| typescript | ^5 | Type checking |
| tailwindcss | ^4 | CSS framework |
| @tailwindcss/postcss | ^4 | TW PostCSS plugin |
| axios | ^1 | HTTP client |
| lucide-react | ^latest | Icon library |
| vite | ^7 | Build tool |
| eslint | ^latest | Code linting |

---

## 🎯 Performance Tips

1. **Lazy Loading**: Countries load once and are cached
2. **Pagination**: Only 12 countries rendered per page
3. **Production Build**: Use `npm run build` for optimized assets
4. **Image Optimization**: API provides optimized PNG flags

---

## 🔮 Future Enhancements

### Short Term (Easy)
- [ ] Dark mode toggle
- [ ] Favorite countries (localStorage)
- [ ] Export country list (CSV/JSON)
- [ ] Advanced sorting options

### Medium Term (Moderate)
- [ ] Flag color detection
- [ ] Country comparison tool
- [ ] Multi-language support
- [ ] Infinite scroll option

### Long Term (Complex)
- [ ] Backend integration
- [ ] User accounts
- [ ] Custom flags database
- [ ] Analytics dashboard

---

## 📚 Learning Resources

### React
- [React Hooks](https://react.dev/reference/react)
- [React Router](https://reactrouter.com/)

### Tailwind CSS
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Utility Classes](https://tailwindcss.com/docs/utility-first)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Type Definitions](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

### REST Countries API
- [API Documentation](https://restcountries.com/)
- [Endpoint Examples](https://restcountries.com/#api-endpoints-v31-all)

---

## 🤝 Contributing

When making changes:
1. Keep components focused and reusable
2. Use TypeScript for type safety
3. Follow Tailwind utility naming conventions
4. Test in different screen sizes
5. Update documentation

---

## 📝 Notes

- **Free API**: No authentication needed for REST Countries
- **Rate Limiting**: API may have rate limits in production
- **Browser Support**: Works in all modern browsers
- **Mobile First**: Design approach optimizes for mobile first

---

**Happy coding! 🚀**

For issues or questions, check the main [README.md](README.md)
