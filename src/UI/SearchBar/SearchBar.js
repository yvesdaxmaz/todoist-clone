import React, { useState } from 'react';
import { BsQuestionCircle, BsSearch, BsTimes, BsInbox } from 'react-icons/bs';
import { TiTimes } from 'react-icons/ti';
import { CgCalendarDates } from 'react-icons/cg';
import Button from './../Button/Button';

const SearchBar = props => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [findHovered, setFindHovered] = useState(false);

  return (
    <div
      className={
        'relative flex' +
        (focused || hovered
          ? ' bg-white'
          : ' hover:bg-white bg-red-100 bg-opacity-25') +
        ' items-center px-2 py-1 space-x-2 rounded'
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <BsSearch
        className={
          focused || hovered ? 'text-gray-600' : 'group-hover:text-gray-600'
        }
      />
      <input
        id=""
        type="text"
        name="search_term"
        placeholder="Find"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={
          (focused ? 'w-96 text-gray-600 ' : 'w-32') +
          (hovered || focused
            ? ' placeholder-gray-600'
            : ' placeholder-white') +
          ' bg-transparent outline-none text-sm flex-grow'
        }
      />
      {focused ? (
        <div className="absolute right-0 top-0 mr-4 flex items-center space-x-1 h-7">
          <button className="group flex items-center justify-center h-6 w-6">
            <div
              className={
                'relative flex items-center justify-center h-6 w-6 hover:bg-gray-300 hover:bg-opacity-25 rounded'
              }
            >
              <BsQuestionCircle className="text-gray-600" />
              <div className="hidden group-hover:block absolute whitespace-nowrap w-auto transform translate-y-full z-10">
                <div className="flex items-center bg-gray-800 p-2 rounded">
                  <span className="text-xs">How to use search</span>
                </div>
              </div>
            </div>
          </button>
          <button
            className="flex items-center justify-center h-6 w-6"
            onClick={() => setFocused(false)}
          >
            <div
              className={
                'flex items-center justify-center h-6 w-6 hover:bg-gray-300 hover:bg-opacity-25 rounded'
              }
            >
              <TiTimes className="text-gray-600" />
            </div>
          </button>
        </div>
      ) : (
        <div
          className={
            (hovered
              ? 'border border-gray-300 text-gray-600'
              : 'text-transparent border-transparent border') +
            ' relative group text-xs px-2 rounded'
          }
          onMouseEnter={() => setFindHovered(true)}
          onMouseLeave={() => setFindHovered(false)}
        >
          <span>f</span>
          <div
            className={
              (findHovered ? 'block' : 'hidden') +
              ' absolute whitespace-nowrap w-auto left-0 mt-2 z-10'
            }
          >
            <div className="flex h-8 space-x-2 items-center bg-gray-800 p-2 rounded">
              <span className="text-xs text-white">Quick Find</span>
              <span className="flex h-5 w-5 items-center justify-center block bg-gray-600 py-1 px-2 text-gray-300 rounded">
                f
              </span>
            </div>
          </div>
        </div>
      )}
      {focused ? (
        <div className="absolute mt-8 rounded top-0 left-0 w-full max-w-64 bg-white shadow text-gray-900">
          <div className="">
            <h4 className="text-sm text-gray-900 font-bold p-2">
              Recently view
            </h4>
            <div className="text-xs p-2  hover:bg-gray-100">
              <div className="flex items-center space-x-2">
                <CgCalendarDates className="text-purple-600" size="2em" />
                <span className="text-gray-600 text-sm">Upcoming</span>
              </div>
            </div>
            <div className="text-xs p-2 hover:bg-gray-100">
              <div className="flex items-center space-x-2">
                <BsInbox className="text-blue-600" size="2em" />
                <span className="text-gray-600 text-sm">Inbox</span>
              </div>
            </div>
            <div className="text-xs p-2  hover:bg-gray-100">
              <div className="flex items-center space-x-2">
                <CgCalendarDates className="text-green-600" size="2em" />
                <span className="text-gray-600 text-sm">Inbox</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
