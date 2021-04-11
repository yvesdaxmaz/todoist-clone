import React, { useState } from 'react';

const Switch = ({ label, change }) => {
  const [activated, setActivated] = useState(false);

  const handleClick = () => {
    setActivated(!activated);
    change(activated);
  };
  return (
    <div className="w-full text-sm h-8" onClick={handleClick}>
      <div className="flex items-center space-x-4 h-full">
        <div
          className={
            (activated
              ? 'bg-green-600 justify-end'
              : 'bg-gray-300 justify-start') +
            ' flex items-center w-10 h-5 py-1 px-2 rounded-full'
          }
        >
          <div className="h-3 w-3 rounded-full bg-white"></div>
        </div>
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};

export default Switch;
