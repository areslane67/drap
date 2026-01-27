import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Country } from '../services/countryService';
import { countryService } from '../services/countryService';
import SearchBar from '../components/SearchBar';
import FlagList from '../components/FlagList';
import ColorFilter from '../components/ColorFilter';

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [availableColors] = useState(['red', 'blue', 'white', 'green', 'yellow', 'black', 'orange']);
  const navigate = useNavigate();

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to load countries...');
        const data = await countryService.getAllCountries();
        console.log('Loaded countries:', data.length);
        console.log('Countries data:', data);
        if (data.length === 0) {
          setError('No countries available. Please check your internet connection.');
        } else {
          setCountries(data);
          setFilteredCountries(data);
        }
      } catch (error) {
        console.error('Failed to load countries:', error);
        setError('Unable to load countries. Using sample data instead.');
        setCountries([]);
        setFilteredCountries([]);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    let results = countries;

    // Filter by search query
    if (searchQuery.trim()) {
      results = results.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion) {
      results = results.filter((country) => country.region === selectedRegion);
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      results = results.filter((country) => {
        // Check if country has colors from REST Countries API
        if (country.colors && country.colors.length > 0) {
          return selectedColors.some(selectedColor =>
            country.colors?.some(countryColor =>
              countryColor.toLowerCase() === selectedColor.toLowerCase()
            )
          );
        }
        return false;
      });
    }

    // Sort by population (descending)
    results.sort((a, b) => b.population - a.population);

    setFilteredCountries(results);
  }, [searchQuery, selectedRegion, selectedColors, countries]);

  const handleCountryClick = (country: Country) => {
    navigate(`/country/${country.cca2}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <img 
              src="/images/logo.png" 
              alt="Flag Repository Logo" 
              className="h-24 w-auto"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">flag repository</h1>
              <p className="text-gray-600 mt-2">Discover countries, flags, and facts from around the world</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading countries...</p>
            </div>
          </div>
        ) : countries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg mb-4">No countries loaded. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6">
                <p><strong>Note:</strong> {error}</p>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-6">
              <p><strong>Total chargés:</strong> {countries.length} pays | <strong>Affichés:</strong> {filteredCountries.length} pays</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Region Filter */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Region</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="region"
                        value=""
                        checked={selectedRegion === ''}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">All Regions</span>
                    </label>
                    {regions.map((region) => (
                      <label key={region} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="region"
                          value={region}
                          checked={selectedRegion === region}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <ColorFilter
                  availableColors={availableColors}
                  selectedColors={selectedColors}
                  onChange={setSelectedColors}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search countries by name..."
              />
              <FlagList
                countries={filteredCountries}
                loading={false}
                onCountryClick={handleCountryClick}
              />
            </div>
          </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
