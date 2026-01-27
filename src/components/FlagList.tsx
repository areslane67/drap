import React from 'react';
import FlagCard from './FlagCard';
import type { Country } from '../services/countryService';

interface FlagListProps {
  countries: Country[];
  loading: boolean;
  onCountryClick?: (country: Country) => void;
}

const FlagList: React.FC<FlagListProps> = ({
  countries,
  loading,
  onCountryClick,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No countries found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 text-sm text-gray-600">
        <p>Affichage de {countries.length} pays</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country) => (
          <FlagCard
            key={country.cca2}
            flagUrl={country.flags.svg || country.flags.png}
            countryName={country.name.common}
            countryCode={country.cca2}
            onClick={() => onCountryClick?.(country)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlagList;
