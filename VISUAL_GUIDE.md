# 🌍 World Flags Explorer - Quick Visual Guide

## Application Layout

### Home Page

```
┌─────────────────────────────────────────────────────────────────┐
│  🌍 World Flags Explorer                                        │
│  Discover countries, flags, and facts from around the world     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SIDEBAR (Left)          │  MAIN CONTENT (Right)               │
│                          │                                      │
│  📍 Filter by Region:   │  🔍 [Search Bar........................]│
│                          │                                      │
│  ○ All Regions          │  ┌──────┬──────┬──────┬──────┐      │
│  ○ Africa               │  │ 🇨🇳 │ 🇮🇳 │ 🇺🇸 │ 🇮🇩 │      │
│  ○ Americas             │  │China │India │USA  │Indo..│      │
│  ○ Asia                 │  └──────┴──────┴──────┴──────┘      │
│  ○ Europe               │                                      │
│  ○ Oceania              │  ┌──────┬──────┬──────┬──────┐      │
│                          │  │ 🇵🇰 │ 🇧🇷 │ 🇳🇬 │ 🇧🇩 │      │
│  🎨 Filter by Colors:   │  │Paki..│Brazil│Nigeria│Bang..│      │
│                          │  └──────┴──────┴──────┴──────┘      │
│  ☑ Red                   │                                      │
│  ☑ Blue                  │  [12 more countries...]             │
│  ☑ White                 │                                      │
│  ☑ Green                 │  [◄ Prev] [1][2][3]... [Next ►]    │
│  ☑ Yellow                │                                      │
│  ☑ Black                 │                                      │
│  ☑ Orange                │                                      │
│                          │                                      │
│  [Clear All]             │                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Country Detail Page

```
┌─────────────────────────────────────────────────────────────────┐
│  [◄ Back] France                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌────────────────────┐  │  France                             │
│  │                    │  │  Official: French Republic          │
│  │  🇫🇷 (Large)      │  │                                     │
│  │                    │  │  ┌─────────────┬────────────────┐  │
│  │                    │  │  │ 👥 67.9M    │ 📍 Europe      │  │
│  └────────────────────┘  │  │ 🏛️ Paris    │ 🔤 FR          │  │
│                          │  └─────────────┴────────────────┘  │
│                          │                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────┐
│  │ Quick Facts         │  │ Code Information    │  │Statistics│
│  │                     │  │                     │  │          │
│  │ • Pop. Density      │  │ • ISO 3166-1        │  │ • Total  │
│  │   68k per km²       │  │   Alpha 2: FR       │  │   Pop:   │
│  │                     │  │                     │  │   67.9M  │
│  │ • Region: Europe    │  │                     │  │          │
│  │                     │  │                     │  │          │
│  │ • Subregion:        │  │                     │  │          │
│  │   Western Europe    │  │                     │  │          │
│  │                     │  │                     │  │          │
│  └─────────────────────┘  └─────────────────────┘  └──────────┘
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Structure

```
App (with React Router)
│
├── Route: /
│   └── Home Page
│       ├── SearchBar
│       │   └── Search Input + Lucide Icon
│       │
│       ├── Sidebar Filters
│       │   ├── Region Filter (Radio Buttons)
│       │   └── ColorFilter Component
│       │       ├── Color Checkboxes
│       │       └── Clear Button
│       │
│       └── FlagList
│           ├── Loading State
│           ├── Grid Layout (responsive)
│           │   └── FlagCard Component (×12)
│           │       ├── Flag Image
│           │       ├── Country Name
│           │       └── Country Code
│           │
│           └── Pagination Controls
│               ├── Previous Button
│               ├── Page Numbers
│               └── Next Button
│
└── Route: /country/:code
    └── CountryDetail Page
        ├── Back Navigation
        ├── Flag Display (SVG)
        ├── Country Information
        │   ├── Names (Official + Common)
        │   ├── Population (formatted)
        │   ├── Region
        │   ├── Subregion
        │   ├── Capital
        │   └── Country Code
        │
        └── Statistics Cards
            ├── Quick Facts
            ├── Code Information
            └── Statistics
```

## Data Flow

```
User Input (Search/Filter)
        ↓
Home.tsx (State Update)
        ↓
useEffect triggers filtering logic
        ↓
Filter countries array by:
- Search query
- Selected region
- Selected colors
        ↓
Sort by population (descending)
        ↓
setFilteredCountries(results)
        ↓
FlagList receives filtered countries
        ↓
Slice array for pagination (0-12, 12-24, etc)
        ↓
Map to FlagCard components
        ↓
User clicks FlagCard
        ↓
navigate('/country/{code}')
        ↓
CountryDetail page
        ↓
Fetch country data via API
        ↓
Display details
```

## Feature Interaction Flow

### Search Feature
```
User types "france"
        ↓
SearchBar onChange event
        ↓
setSearchQuery("france")
        ↓
useEffect in Home.tsx
        ↓
Filter: name.common or name.official contains "france"
        ↓
Update FlagList with filtered results
        ↓
Display: Only France
```

### Region Filter Feature
```
User clicks "Asia"
        ↓
setSelectedRegion("Asia")
        ↓
useEffect in Home.tsx
        ↓
Filter: country.region === "Asia"
        ↓
Update FlagList with Asian countries
        ↓
Display: All 48 Asian countries (paginated)
```

### Pagination Feature
```
User on page 1 (countries 1-12)
        ↓
User clicks "Next" button
        ↓
setCurrentPage(2)
        ↓
Calculate: startIndex = 12, endIndex = 24
        ↓
Slice: countries.slice(12, 24)
        ↓
Display: Countries 13-24
        ↓
Show: Page indicator [2]
```

### Country Detail Feature
```
User clicks France card
        ↓
onClick handler triggered
        ↓
onCountryClick(country) called
        ↓
navigate(`/country/${country.cca2}`)
        ↓
Route matches: /country/FR
        ↓
CountryDetail loads with code="FR"
        ↓
useEffect fetches country data
        ↓
Display: All France details
```

## Responsive Design Breakpoints

```
Mobile (<640px)          Tablet (640-1024px)      Desktop (>1024px)
┌──────────┐            ┌──────────────┐         ┌─────────────────────┐
│ 🔍 Search│            │ 🔍 Search... │         │ Filter  │  Main     │
├──────────┤            ├──────────────┤         │         │           │
│          │            │ Filter │Main │         │ Region  │ 🔍 Search │
│  🇨🇳     │            │        │     │         │ Area    │           │
│ China    │            │ Region │🇨🇳 │         │         │ ┌──┬──┬──┐│
│          │            │ Area   │USA │         │ Colors  │ │🇨🇳│🇮🇳│🇺🇸││
├──────────┤            │        │    │         │         │ └──┴──┴──┘│
│  🇮🇳     │            │ Colors │🇮🇳 │         │ [Clear] │ ┌──┬──┬──┐│
│ India    │            │        │    │         │         │ │🇵🇰│🇧🇷│🇳🇬││
│          │            └────────┴────┘         │         │ └──┴──┴──┘│
├──────────┤                                     │         │ [Prev][1][Next]│
│ [Prev][1]│                                     └─────────┴───────────┘
│[2][Next] │
└──────────┘

1 Column              2 Columns                 3-4 Columns
```

## API Integration Pattern

```
Component mounts
        ↓
useEffect with empty dependency array
        ↓
Call countryService.getAllCountries()
        ↓
axios.get('https://restcountries.com/v3.1/all')
        ↓
Response received
        ↓
Data transformed (if needed)
        ↓
setState(countries)
        ↓
Component renders with data
        ↓
Filter/search operations on cached data
        ↓
No additional API calls needed
```

## File Size & Performance

```
Development Build:
  HTML:  ~2KB
  CSS:   ~500KB (with all utilities)
  JS:    ~900KB (with React + deps)
  
Production Build (Optimized):
  HTML:  0.45 KB
  CSS:   16.59 KB (gzipped: 4.22 KB)
  JS:    278.61 KB (gzipped: 91.32 KB)
  
Total: ~300 KB (optimized)
Load Time: < 1 second (typical)
```

## Dependencies Tree

```
react 18.3.1
├── react-dom 18.3.1
└── react-router-dom 6.24.1

axios 1.7.2

lucide-react 0.449.0
└── lucide icons

tailwindcss 4.1.1
├── @tailwindcss/postcss 4.1.1
└── postcss 8.4.47
    └── autoprefixer 10.4.20

typescript 5.2.2

vite 7.3.1
├── @vitejs/plugin-react 4.2.1
└── rollup (bundler)

eslint 9.13.0
```

## State Management Flow

```
Home Component State:
├── countries (all 195 countries from API)
├── filteredCountries (after filters applied)
├── loading (boolean)
├── searchQuery (string)
├── selectedColors (array)
└── selectedRegion (string)

CountryDetail Component State:
├── country (single country data)
├── loading (boolean)
└── error (error message)
```

## Styling Layers

```
Global Styles (index.css)
├── Tailwind imports (@import "tailwindcss")
├── CSS reset
└── Custom properties

Component Styles
├── Tailwind utility classes
├── Responsive breakpoints (sm:, md:, lg:, xl:)
└── Hover/focus states

App Styles (App.css)
└── Layout container styles
```

## Development Workflow

```
1. Start dev server
   npm run dev
   ↓
2. Make code changes
   ↓
3. HMR triggers
   ↓
4. Browser auto-refreshes
   ↓
5. See changes instantly
   ↓
6. Repeat steps 2-5
   ↓
7. When ready, build
   npm run build
   ↓
8. Deploy dist/ folder
```

---

**This visual guide helps understand the project architecture and data flow at a glance.**

For detailed information, see:
- DEVELOPER_GUIDE.md - Technical deep dive
- USAGE_GUIDE.md - Feature explanations
- Component source files - Implementation details
