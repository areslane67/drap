import React from 'react';

interface ColorFilterProps {
  availableColors: string[];
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}

// Common flag colors
const COLOR_NAMES: Record<string, string> = {
  red: 'Red',
  blue: 'Blue',
  white: 'White',
  green: 'Green',
  yellow: 'Yellow',
  black: 'Black',
  orange: 'Orange',
  purple: 'Purple',
};

const ColorFilter: React.FC<ColorFilterProps> = ({
  availableColors,
  selectedColors,
  onChange,
}) => {
  const handleColorToggle = (color: string) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Colors</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availableColors.map((color) => (
          <label
            key={color}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedColors.includes(color)}
              onChange={() => handleColorToggle(color)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700">{COLOR_NAMES[color] || color}</span>
          </label>
        ))}
      </div>
      {selectedColors.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="mt-4 text-sm text-blue-500 hover:text-blue-700 underline"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default ColorFilter;
