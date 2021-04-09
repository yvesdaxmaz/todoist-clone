import React from 'react';

const NavItem = ({ title, counter, children, isActive }) => {
  return (
    <div
      className={
        'flex p-2 space-x-4 items-center text-sm rounded transition duration-300 ' +
        (isActive ? 'bg-gray-200' : 'hover:bg-gray-200')
      }
    >
      {children}
      <span className="flex-grow text-gray-800">{title}</span>
      <span
        className={(isActive ? 'text-red-300 ' : 'text-gray-300 ') + ' text-sm'}
      >
        {counter}
      </span>
    </div>
  );
};

export default NavItem;
