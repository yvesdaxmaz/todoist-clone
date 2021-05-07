import React, { useRef, useEffect } from 'react';
import {
  BsArrowUp,
  BsArrowDown,
  BsPlus,
  BsTrash,
  BsCalendar,
  BsThreeDots,
  BsFlag,
  BsFlagFill,
} from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { RiEdit2Fill } from 'react-icons/ri';
import { GiAlarmClock, GiSofa } from 'react-icons/gi';
import { CgCalendarNext } from 'react-icons/cg';
import { BiLink, BiRightArrowCircle, BiDuplicate } from 'react-icons/bi';
import Button from './../../UI/Button/Button';
import { useStateValue } from './../../StateProvider';
import { DELETE_TASK_TO_PROJECT } from './../../actionTypes';

const TaskOptions = ({ hide, edit, id, completed }) => {
  const wrapperRef = useRef(null);
  const [state, dispatch] = useStateValue();
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      hide();
    }
  };
  const handleDeleteTask = () => {
    dispatch({
      type: DELETE_TASK_TO_PROJECT,
      task_id: id,
    });
    hide();
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  });
  if (completed) {
    return (
      <div
        className="absolute top-0 right-0 transform mt-8 z-20 bg-white"
        style={{ width: '16rem' }}
        ref={wrapperRef}
      >
        <div className="shadow border border-gray-200 rounded">
          <div className="py-1 border-b border-gray-200">
            <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
              <span className="relative flex items-center justify-center h-8 w-8">
                <BiLink size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Copy link to task
              </span>
            </div>
          </div>
          <div className="py-1 border-b border-gray-200">
            <div
              className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
              onClick={handleDeleteTask}
            >
              <span className="relative flex items-center justify-center h-8 w-8">
                <BsTrash size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Delete task
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="absolute top-0 right-0 transform mt-8 z-20 bg-white"
        style={{ width: '16rem' }}
        ref={wrapperRef}
      >
        <div className="shadow border border-gray-200 rounded">
          <div className="py-1 border-b border-gray-200">
            <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full">
              <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                <BsArrowUp size="1.5em" />
                <BsPlus className="absolute bottom-0 right-0 transform mb-1" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Add task above
              </span>
            </div>
            <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
              <span className="relative flex items-center justify-center h-8 w-8">
                <BsArrowDown size="1.5em" />
                <BsPlus className="absolute top-0 right-0 transform mt-1" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Add task below
              </span>
            </div>
            <div
              className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
              onClick={() => {
                edit();
                hide();
              }}
            >
              <span className="relative flex items-center justify-center h-8 w-8">
                <RiEdit2Fill size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">Edit task</span>
            </div>
          </div>
          <div className="py-1 border-b border-gray-200">
            <div className="px-2">
              <div className="text-xs text-medium text-gray-600 pb-2">
                Schedule
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="Today"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <BsCalendar size="1.5em" className="text-green-500" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="Tomorrow"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <FiSun size="1.5em" className="text-yellow-500" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="This weekend"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <GiSofa size="1.5em" className="text-blue-300" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="Next weekend"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <CgCalendarNext size="1.5em" className="text-purple-500" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="More"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <BsThreeDots size="1.5em" className="text-purple-500" />
                </Button>
              </div>
            </div>
            <div className="px-2">
              <div className="text-xs text-medium text-gray-600 pb-2">
                Priority
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="Priority 1"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <BsFlagFill size="1.5em" className="text-red-500" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="Priority 2"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <BsFlagFill size="1.5em" className="text-yellow-500" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="Priority 3"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <BsFlagFill size="1.5em" className="text-blue-700" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="300"
                  optinText="Priority 4"
                  click={() => {}}
                  classes="text-gray-300"
                >
                  <BsFlag size="1.5em" className="" />
                </Button>
              </div>
            </div>
          </div>
          <div className="py-1 border-b border-gray-200">
            <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
              <span className="relative flex items-center justify-center h-8 w-8">
                <GiAlarmClock size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">Reminders</span>
            </div>
          </div>
          <div className="py-1 border-b border-gray-200">
            <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
              <span className="relative flex items-center justify-center h-8 w-8">
                <BiRightArrowCircle size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Move to project
              </span>
            </div>

            <div
              className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full"
              onClick={() => {} /*handleDuplicateProject*/}
            >
              <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                <BiDuplicate size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Duplicate project
              </span>
            </div>
            <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
              <span className="relative flex items-center justify-center h-8 w-8">
                <BiLink size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Copy link to task
              </span>
            </div>
          </div>
          <div className="py-1 border-b border-gray-200">
            <div
              className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
              onClick={handleDeleteTask}
            >
              <span className="relative flex items-center justify-center h-8 w-8">
                <BsTrash size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Delete task
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TaskOptions;
