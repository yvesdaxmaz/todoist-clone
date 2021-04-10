import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';

const ColorSelector = props => {
  const [selectedColor, setSelectedColor] = useState('bg-gray-300');
  const [dropped, setDropped] = useState(false);
  const colors = {
    'bg-gray-600': 'Charcolor',
    'bg-gray-300': 'Grey',
    'bg-red-600': 'Red',
    'bg-yellow-500': 'Yellow',
    'bg-red-300': 'Salmon',
    'bg-green-500': 'Green',
    'bg-purple-700': 'Grape',
    'bg-purple-500': 'Violet',
    'bg-blue-600': 'Sky Blue',
    'bg-blue-300': 'Light Blue',
  };

  const handleChangeColor = color => {
    setSelectedColor(color);
    setDropped(false);
  };

  const handleClick = event => {
    event.preventDefault();
    setDropped(!dropped);
  };

  return (
    <div className="relative">
      <div
        className="w-full border border-gray-100 focus:border-gray-300 text-sm rounded py-1 h-8"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-4 h-full px-4">
          <div className={'h-3 w-3 rounded-full ' + selectedColor}></div>
          <span className="text-sm">{colors[selectedColor]}</span>
        </div>
      </div>
      {dropped ? (
        <div className="absolute z-20 top-0 left-0 w-full mt-8 overflow-scroll-y border border-gray-200 rounded bg-white">
          {Object.keys(colors).map(colorName => {
            return (
              <div
                className={
                  (colorName === selectedColor
                    ? 'bg-gray-200'
                    : 'hover:bg-gray-100') +
                  ' flex items-center space-x-4 h-full px-4 py-1'
                }
                onClick={() => handleChangeColor(colorName)}
              >
                <div className={'h-3 w-3 rounded-full ' + colorName}></div>
                <span className="text-sm flex-grow">{colors[colorName]}</span>
                {colorName === selectedColor ? <BsCheck size="0.8em" /> : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ColorSelector;
