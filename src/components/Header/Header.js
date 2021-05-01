import React from 'react';
import { MdDehaze, MdTrendingUp } from 'react-icons/md';
import { BsQuestionCircle } from 'react-icons/bs';
import { VscHome, VscBell } from 'react-icons/vsc';
import { FiPlus } from 'react-icons/fi';
import profile from './../../images/profile.jpeg';
import SearchBar from './../../UI/SearchBar/SearchBar';
import Button from './../../UI/Button/Button';
import { SHOW_QUICK_TASK_MODAL } from './../../actionTypes';
import { useStateValue } from './../../StateProvider';

const Header = props => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();

  const handleQuickTask = () => {
    console.log('click add new task');
    dispatch({
      type: SHOW_QUICK_TASK_MODAL,
    });
  };
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
              <Button
                optinText="Quick Add Task"
                shortcutKey="q"
                click={handleQuickTask}
              >
                <FiPlus size="1.5em" />
              </Button>

              <Button>
                <BsQuestionCircle size="1.5em" />
              </Button>

              <Button texted>
                <div className="border border-white rounded-full">
                  <MdTrendingUp size="1em" />
                </div>
                <span className="text-sm">0/5</span>
              </Button>

              <Button>
                <VscBell size="1.5em" />
              </Button>

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
