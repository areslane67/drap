import React, { useState } from 'react';

interface FlagCardProps {
  flagUrl: string;
  countryName: string;
  countryCode: string;
  onClick?: () => void;
}

const FlagCard: React.FC<FlagCardProps> = ({
  flagUrl,
  countryName,
  countryCode,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="h-40 overflow-hidden bg-gray-200 flex items-center justify-center">
        {imageError ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-300">
            <span className="text-4xl">🏳️</span>
          </div>
        ) : (
          <img
            src={flagUrl}
            alt={`Flag of ${countryName}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{countryName}</h3>
        <p className="text-sm text-gray-500">{countryCode}</p>
      </div>
    </div>
  );
};

export default FlagCard;
