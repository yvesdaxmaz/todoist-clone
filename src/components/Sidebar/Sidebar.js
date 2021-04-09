import React from 'react';
import Nav from './Nav';

const Sidebar = props => {
  return (
    <div
      className="fixed h-full w-full bg-gray-900 bg-opacity-75 md:bg-transparent"
      style={{ width: '280px' }}
    >
      <div className="h-full bg-gray-100 z-20">
        <div className="pt-8 pl-8 pr-2">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
