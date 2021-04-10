import React from 'react';
import { MdDehaze, MdTrendingUp } from 'react-icons/md';
import { BsQuestionCircle } from 'react-icons/bs';
import { VscHome, VscBell } from 'react-icons/vsc';
import { FiPlus } from 'react-icons/fi';
import profile from './../../images/profile.jpeg';
import SearchBar from './../../UI/SearchBar/SearchBar';
import Button from './../../UI/Button/Button';

const Header = props => {
  return (
    <header className="App-header">
      <div className="bg-red-600">
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between py-2">
            <div className="flex space-x-2 items-center text-white">
              <Button optinText="Close menu" shortcutKey="m">
                <MdDehaze size="1.5em" />
              </Button>
              <Button optinText="Go to Home view" shortcutKey="h">
                <VscHome size="1.5em" />
              </Button>

              <div>
                <SearchBar />
              </div>
            </div>
            <div className="flex space-x-2 items-center text-white">
              <Button optinText="Quick Add Task" shortcutKey="q">
                <FiPlus size="1.5em" />
              </Button>

              <Button>
                <BsQuestionCircle size="1.5em" />
              </Button>

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
    </header>
  );
};

export default Header;
