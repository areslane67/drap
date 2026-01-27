import axios from 'axios';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
  region: string;
  subregion?: string;
  population: number;
  capital?: string[];
  colors?: string[];
}

// Flag colors mapping by country code
const FLAG_COLORS_MAP: Record<string, string[]> = {
  'FR': ['blue', 'white', 'red'],
  'DE': ['black', 'red', 'yellow'],
  'IT': ['green', 'white', 'red'],
  'ES': ['red', 'yellow'],
  'GB': ['blue', 'red', 'white'],
  'US': ['red', 'white', 'blue'],
  'CA': ['red', 'white'],
  'MX': ['green', 'white', 'red'],
  'BR': ['green', 'yellow', 'blue', 'white'],
  'CN': ['red', 'yellow'],
  'IN': ['orange', 'white', 'green', 'blue'],
  'JP': ['red', 'white'],
  'ZA': ['black', 'green', 'yellow', 'white', 'blue', 'red'],
  'EG': ['red', 'white', 'black'],
  'AU': ['blue', 'white', 'red'],
  'RU': ['white', 'blue', 'red'],
  'UK': ['blue', 'yellow'],
  'PL': ['white', 'red'],
  'NL': ['red', 'white', 'blue'],
  'BE': ['black', 'yellow', 'red'],
  'SE': ['blue', 'yellow'],
  'NO': ['red', 'blue', 'white'],
  'DK': ['red', 'white'],
  'FI': ['blue', 'white'],
  'CH': ['red', 'white'],
  'AT': ['red', 'white'],
  'CZ': ['red', 'white', 'blue'],
  'HU': ['red', 'white', 'green'],
  'RO': ['blue', 'yellow', 'red'],
  'GR': ['blue', 'white'],
  'PT': ['green', 'red', 'yellow', 'white', 'blue'],
  'TR': ['red', 'white'],
  'SA': ['green', 'white'],
  'AE': ['green', 'white', 'black', 'red'],
  'IL': ['blue', 'white'],
  'SG': ['red', 'white'],
  'MY': ['yellow', 'blue', 'white', 'red'],
  'TH': ['red', 'white', 'blue'],
  'VN': ['red', 'yellow'],
  'PH': ['blue', 'yellow', 'white', 'red'],
  'ID': ['red', 'white'],
  'KR': ['red', 'white', 'blue', 'black'],
  'PK': ['green', 'white'],
  'BD': ['green', 'red'],
  'NZ': ['blue', 'red', 'white'],
  'AR': ['blue', 'white'],
  'CL': ['blue', 'white', 'red'],
  'CO': ['yellow', 'blue', 'red'],
  'PE': ['red', 'white'],
  'VE': ['yellow', 'blue', 'red'],
  'IR': ['green', 'white', 'red'],
  'IQ': ['red', 'white', 'black'],
  'KE': ['black', 'red', 'white', 'green'],
  'NG': ['green', 'white'],
  'ET': ['red', 'yellow', 'green'],
  'GH': ['red', 'yellow', 'green', 'black', 'white'],
  'MA': ['red', 'green'],
  'TN': ['red', 'white'],
  'DZ': ['green', 'white', 'red'],
  'CU': ['blue', 'white', 'red'],
  'DO': ['blue', 'red', 'white'],
  'JM': ['green', 'yellow', 'black'],
  'TW': ['red', 'blue', 'white', 'yellow'],
  'HK': ['red', 'white'],
  'MO': ['green', 'white', 'yellow', 'blue'],
  'MM': ['yellow', 'green', 'red'],
  'LK': ['blue', 'red', 'green', 'yellow', 'white'],
  'NP': ['blue', 'red', 'white'],
  'QA': ['white', 'purple'],
  'OM': ['white', 'red', 'green'],
  'KW': ['green', 'white', 'red', 'black'],
  'BH': ['white', 'red'],
  'JO': ['black', 'white', 'green', 'red'],
  'LB': ['red', 'white', 'green'],
  'SY': ['black', 'white', 'red'],
  'YE': ['red', 'white', 'black'],
  'CR': ['blue', 'white', 'red'],
  'PA': ['red', 'blue', 'white'],
  'GT': ['blue', 'white', 'red'],
};

// Mock data for fallback
const MOCK_COUNTRIES: Country[] = [
  {
    name: { common: 'France', official: 'French Republic' },
    cca2: 'FR',
    flags: { svg: 'https://flagcdn.com/fr.svg', png: 'https://flagcdn.com/w320/fr.png' },
    region: 'Europe',
    subregion: 'Western Europe',
    population: 67970000,
    capital: ['Paris']
  },
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    cca2: 'DE',
    flags: { svg: 'https://flagcdn.com/de.svg', png: 'https://flagcdn.com/w320/de.png' },
    region: 'Europe',
    subregion: 'Western Europe',
    population: 83240000,
    capital: ['Berlin']
  },
  {
    name: { common: 'Italy', official: 'Italian Republic' },
    cca2: 'IT',
    flags: { svg: 'https://flagcdn.com/it.svg', png: 'https://flagcdn.com/w320/it.png' },
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 58940000,
    capital: ['Rome']
  },
  {
    name: { common: 'Spain', official: 'Kingdom of Spain' },
    cca2: 'ES',
    flags: { svg: 'https://flagcdn.com/es.svg', png: 'https://flagcdn.com/w320/es.png' },
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 47560000,
    capital: ['Madrid']
  },
  {
    name: { common: 'United Kingdom', official: 'United Kingdom' },
    cca2: 'GB',
    flags: { svg: 'https://flagcdn.com/gb.svg', png: 'https://flagcdn.com/w320/gb.png' },
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 67330000,
    capital: ['London']
  },
  {
    name: { common: 'United States', official: 'United States of America' },
    cca2: 'US',
    flags: { svg: 'https://flagcdn.com/us.svg', png: 'https://flagcdn.com/w320/us.png' },
    region: 'Americas',
    subregion: 'North America',
    population: 338280000,
    capital: ['Washington, D.C.']
  },
  {
    name: { common: 'Canada', official: 'Canada' },
    cca2: 'CA',
    flags: { svg: 'https://flagcdn.com/ca.svg', png: 'https://flagcdn.com/w320/ca.png' },
    region: 'Americas',
    subregion: 'North America',
    population: 39740000,
    capital: ['Ottawa']
  },
  {
    name: { common: 'Mexico', official: 'United Mexican States' },
    cca2: 'MX',
    flags: { svg: 'https://flagcdn.com/mx.svg', png: 'https://flagcdn.com/w320/mx.png' },
    region: 'Americas',
    subregion: 'North America',
    population: 128930000,
    capital: ['Mexico City']
  },
  {
    name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
    cca2: 'BR',
    flags: { svg: 'https://flagcdn.com/br.svg', png: 'https://flagcdn.com/w320/br.png' },
    region: 'Americas',
    subregion: 'South America',
    population: 215313000,
    capital: ['Brasília']
  },
  {
    name: { common: 'China', official: 'People\'s Republic of China' },
    cca2: 'CN',
    flags: { svg: 'https://flagcdn.com/cn.svg', png: 'https://flagcdn.com/w320/cn.png' },
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 1425887337,
    capital: ['Beijing']
  },
  {
    name: { common: 'India', official: 'India' },
    cca2: 'IN',
    flags: { svg: 'https://flagcdn.com/in.svg', png: 'https://flagcdn.com/w320/in.png' },
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 1417173173,
    capital: ['New Delhi']
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    cca2: 'JP',
    flags: { svg: 'https://flagcdn.com/jp.svg', png: 'https://flagcdn.com/w320/jp.png' },
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 123294513,
    capital: ['Tokyo']
  },
  {
    name: { common: 'South Africa', official: 'Republic of South Africa' },
    cca2: 'ZA',
    flags: { svg: 'https://flagcdn.com/za.svg', png: 'https://flagcdn.com/w320/za.png' },
    region: 'Africa',
    subregion: 'Southern Africa',
    population: 60142978,
    capital: ['Pretoria']
  },
  {
    name: { common: 'Egypt', official: 'Arab Republic of Egypt' },
    cca2: 'EG',
    flags: { svg: 'https://flagcdn.com/eg.svg', png: 'https://flagcdn.com/w320/eg.png' },
    region: 'Africa',
    subregion: 'Northern Africa',
    population: 104124440,
    capital: ['Cairo']
  },
  {
    name: { common: 'Australia', official: 'Commonwealth of Australia' },
    cca2: 'AU',
    flags: { svg: 'https://flagcdn.com/au.svg', png: 'https://flagcdn.com/w320/au.png' },
    region: 'Oceania',
    subregion: 'Oceania',
    population: 26068792,
    capital: ['Canberra']
  }
];

// Helper function to enrich country data with flag colors
const enrichCountriesWithColors = (countries: Country[]): Country[] => {
  return countries.map(country => ({
    ...country,
    colors: country.colors && country.colors.length > 0 
      ? country.colors 
      : (FLAG_COLORS_MAP[country.cca2] || [])
  }));
};

export const countryService = {
  getAllCountries: async (): Promise<Country[]> => {
    try {
      console.log('Attempting to fetch countries from REST Countries API...');
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,flags,region,subregion,population,capital', {
        timeout: 8000,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log('✅ Countries fetched successfully:', response.data.length);
        const enriched = enrichCountriesWithColors(response.data);
        return enriched;
      }
    } catch {
      console.warn('❌ REST Countries API failed. Trying alternative API...');
    }

    // Fallback to alternative API if first fails
    try {
      console.log('Attempting alternative API...');
      const response = await axios.get('https://countries.trevorblades.com/', {
        timeout: 8000,
      });
      
      if (response.data?.countries) {
        const transformed = response.data.countries.map((country: { name: string; code: string; continent: string; capital: string }) => ({
          name: {
            common: country.name,
            official: country.name
          },
          cca2: country.code,
          flags: {
            svg: `https://flagcdn.com/${country.code.toLowerCase()}.svg`,
            png: `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`
          },
          region: country.continent || 'Unknown',
          subregion: country.continent,
          population: 0,
          capital: country.capital ? [country.capital] : []
        }));
        console.log('✅ Alternative API successful:', transformed.length);
        const enriched = enrichCountriesWithColors(transformed);
        return enriched;
      }
    } catch {
      console.warn('❌ Alternative API also failed.');
    }

    // Use mock data as final fallback
    console.log('📦 Using mock data as fallback...');
    return enrichCountriesWithColors(MOCK_COUNTRIES);
  },

  getCountryByCode: async (code: string): Promise<Country> => {
    try {
      console.log('Fetching country:', code);
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      const country = response.data[0];
      const enriched = enrichCountriesWithColors([country]);
      return enriched[0];
    } catch (error) {
      console.warn('Error fetching country from API, checking mock data...');
      // Try to find in mock data
      const mockCountry = MOCK_COUNTRIES.find(c => c.cca2 === code);
      if (mockCountry) {
        const enriched = enrichCountriesWithColors([mockCountry]);
        return enriched[0];
      }
      throw error;
    }
  },

  searchCountries: async (query: string): Promise<Country[]> => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
      return enrichCountriesWithColors(response.data);
    } catch {
      console.warn('Error searching countries via API, using local search...');
      // Search in mock data
      const results = MOCK_COUNTRIES.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        country.name.official.toLowerCase().includes(query.toLowerCase())
      );
      return enrichCountriesWithColors(results);
    }
  },

  getCountriesByRegion: async (region: string): Promise<Country[]> => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      return enrichCountriesWithColors(response.data);
    } catch {
      console.warn('Error fetching countries by region, using local filter...');
      // Filter mock data by region
      const results = MOCK_COUNTRIES.filter(country => country.region === region);
      return enrichCountriesWithColors(results);
    }
  },
};
