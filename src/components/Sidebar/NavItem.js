import React, { useState } from 'react';
import { GrDrag } from 'react-icons/gr';
import { BsThreeDots, BsCheck } from 'react-icons/bs';
import NavItemOption from './NavItemOption';
import { Link } from 'react-router-dom';

const NavItem = ({
  title,
  counter,
  children,
  isActive,
  draggable,
  optionable,
  tighten,
  archived,
  favorited,
  id,
  click,
  checked,
  to,
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
      onClick={click}
    >
      {to ? (
        <Link to={to} className="flex-grow">
          <div className="flex space-x-4 items-center">
            {children}
            <span
              className={
                (tighten ? '' : 'flex-grow text-left') + ' text-gray-800'
              }
            >
              {title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex flex-grow space-x-4 items-center">
          {children}
          <span
            className={
              (tighten ? '' : 'flex-grow text-left') + ' text-gray-800'
            }
          >
            {title}
          </span>
        </div>
      )}
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
        <NavItemOption
          id={id}
          enable={showMenu}
          hide={() => setShowMenu(false)}
          archived={archived}
          favorited={favorited}
        />
      ) : null}
      {checked ? <BsCheck className="text-yellow-500" /> : null}
    </div>
  );
};

export default NavItem;
