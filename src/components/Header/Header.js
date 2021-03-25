import React from 'react';
import { MdDehaze, MdTrendingUp } from 'react-icons/md';
import { BsQuestionCircle, BsSearch } from 'react-icons/bs';
import { VscHome, VscBell } from 'react-icons/vsc';
import { FiPlus } from 'react-icons/fi';
import profile from './../../images/profile.jpeg';

const Header = props => {
  return (
    <header className="App-header">
      <div className="bg-red-600">
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between py-2">
            <div className="flex space-x-2 items-center text-white">
              <button>
                <div className="flex items-center justify-center p-1 h-7 w-7 hover:bg-red-100 hover:bg-opacity-25 rounded">
                  <MdDehaze size="1.5em" />
                </div>
              </button>
              <button>
                <div className="flex items-center justify-center p-1 h-7 w-7 hover:bg-red-100 hover:bg-opacity-25 rounded">
                  <VscHome size="1.5em" />
                </div>
              </button>

              <div>
                <div className="flex group hover:bg-white items-center px-2 py-1 space-x-2 bg-red-100 bg-opacity-25 rounded">
                  <BsSearch className="group-hover:text-gray-600" />
                  <input
                    id=""
                    type="text"
                    name="search_term"
                    placeholder="Find"
                    className="bg-transparent placeholder-white group-hover:placeholder-gray-600 text-white outline-none group-hover:text-gray-600 text-sm flex-grow"
                  />
                  <span className="text-xs px-2 rounded border-transparent border group-hover:border-gray-300 text-transparent group-hover:text-gray-600">
                    f
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 items-center text-white">
              <button href="#">
                <div className="flex items-center justify-center p-1 h-7 w-7 hover:bg-red-100 hover:bg-opacity-25 rounded">
                  <FiPlus size="1.5em" />
                </div>
              </button>

              <button>
                <div className="flex items-center justify-center p-1 h-7 w-7 hover:bg-red-100 hover:bg-opacity-25 rounded">
                  <BsQuestionCircle size="1.5em" />
                </div>
              </button>

              <button>
                <div className="flex items-center space-x-2 px-2 p-1 h-7 hover:bg-red-100 hover:bg-opacity-25 rounded">
                  <div className="border border-white rounded-full">
                    <MdTrendingUp />
                  </div>
                  <span className="text-sm">0/5</span>
                </div>
              </button>

              <button href="#">
                <div className="flex items-center justify-center h-7 w-7 hover:bg-red-100 hover:bg-opacity-25 rounded">
                  <VscBell size="1.5em" />
                </div>
              </button>

              <div>
                <div className="h-7 w-7">
                  <img src={profile} alt="" className="w-full rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-sm text-purple-600">Todoist application</h2>
    </header>
  );
};

export default Header;
