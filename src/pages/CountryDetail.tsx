import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Country } from '../services/countryService';
import { countryService } from '../services/countryService';
import { ArrowLeft, Users, MapPin, Globe } from 'lucide-react';

const CountryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountry = async () => {
      if (!code) return;
      try {
        setLoading(true);
        const data = await countryService.getCountryByCode(code);
        setCountry(data);
      } catch (err) {
        setError('Failed to load country details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error || 'Country not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{country.name.common}</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Flag Image */}
          <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-6">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="max-w-full h-auto"
            />
          </div>

          {/* Country Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {country.name.official}
              </h2>
              <p className="text-gray-600">{country.name.common}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Population */}
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-blue-500" />
                  <span className="text-gray-600">Population</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatNumber(country.population)}
                </p>
              </div>

              {/* Region */}
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} className="text-green-500" />
                  <span className="text-gray-600">Region</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{country.region}</p>
              </div>

              {/* Subregion */}
              {country.subregion && (
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={20} className="text-purple-500" />
                    <span className="text-gray-600">Subregion</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{country.subregion}</p>
                </div>
              )}

              {/* Country Code */}
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={20} className="text-red-500" />
                  <span className="text-gray-600">Country Code</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{country.cca2}</p>
              </div>
            </div>

            {/* Capital */}
            {country.capital && country.capital.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Capital</h3>
                <p className="text-gray-700">{country.capital.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Facts</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Population Density:</span>{' '}
                {formatNumber(Math.round(country.population / 1000))} per km²
              </li>
              <li>
                <span className="font-semibold">Region:</span> {country.region}
              </li>
              {country.subregion && (
                <li>
                  <span className="font-semibold">Subregion:</span> {country.subregion}
                </li>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Code Information</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">ISO 3166-1 Alpha 2:</span> {country.cca2}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Total Population:</span>{' '}
                {formatNumber(country.population)}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryDetail;
