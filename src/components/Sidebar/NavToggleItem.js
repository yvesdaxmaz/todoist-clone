import React, { useState } from 'react';

const NavToggleItem = ({ onTitle, offTitle, children }) => {
  const [toggle, setToggle] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className="p-2" onClick={handleClick}>
      <div className="flex-grow text-gray-800 pl-6">
        <span className="text-sm text-gray-600">
          {toggle ? onTitle : offTitle}
        </span>
      </div>
      {toggle ? <nav>{children}</nav> : null}
    </div>
  );
};

export default NavToggleItem;
