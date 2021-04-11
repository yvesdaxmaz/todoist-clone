import React, { useState } from 'react';
import { GrDrag } from 'react-icons/gr';
import {
  BsThreeDots,
  BsArrowUp,
  BsArrowDown,
  BsPlus,
  BsHeart,
} from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { BiUserPlus } from 'react-icons/bi';
const NavItem = ({
  title,
  counter,
  children,
  isActive,
  draggable,
  optionable,
  tighten,
}) => {
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div
      className={
        'relative flex p-2 group space-x-4 items-center text-sm rounded transition duration-300 ' +
        (isActive ? 'bg-gray-200' : 'hover:bg-gray-200')
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span className={(tighten ? '' : 'flex-grow') + ' text-gray-800'}>
        {title}
      </span>
      {!optionable && hovered ? (
        <span
          className={
            (isActive ? 'text-red-400 ' : 'text-gray-400 ') + ' text-xs'
          }
        >
          {counter}
        </span>
      ) : (
        <span className={'text-gray-400 text-xs'}>{counter}</span>
      )}

      {optionable ? (
        <BsThreeDots
          size="1.3em"
          className={
            (hovered ? 'block' : 'hidden') +
            ' text-gray-400 hover:text-gray-600'
          }
          onClick={handleShowMenu}
        />
      ) : null}

      {draggable ? (
        <div
          className={
            (hovered ? 'block' : 'hidden') +
            ' absolute h-full w-8 flex items-center justify-center top-0 left-0 transform -translate-x-10'
          }
        >
          <GrDrag size="1em" className="text-gray-600" />
        </div>
      ) : null}
      {showMenu ? (
        <div className="absolute z-20 bg-white" style={{ width: '16rem' }}>
          <div className="shadow border border-gray-200 rounded">
            <div className="py-1 border-b border-gray-200">
              <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full">
                <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                  <BsArrowUp size="1.5em" />
                  <BsPlus className="absolute bottom-0 right-0 transform mb-1" />
                </span>
                <span className="flex text-xs text-gray-600 py-2">
                  Add project above
                </span>
              </div>
              <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
                <span className="relative flex items-center justify-center h-8 w-8">
                  <BsArrowDown size="1.5em" />
                  <BsPlus className="absolute top-0 right-0 transform mt-1" />
                </span>
                <span className="flex text-xs text-gray-600 py-2">
                  Add project below
                </span>
              </div>
            </div>
            <div className="py-1 border-b border-gray-200">
              <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full">
                <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                  <RiEdit2Fill size="1.5em" />
                </span>
                <span className="flex text-xs text-gray-600 py-2">
                  Edit project
                </span>
              </div>
              <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
                <span className="relative flex items-center justify-center h-8 w-8">
                  <BiUserPlus size="1.5em" />
                </span>
                <span className="flex text-xs text-gray-600 py-2">
                  Share project
                </span>
              </div>
              <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
                <span className="relative flex items-center justify-center h-8 w-8">
                  <BsHeart size="1.5em" />
                </span>
                <span className="flex text-xs text-gray-600 py-2">
                  Add to favorites
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
