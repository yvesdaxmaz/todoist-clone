import React, { useRef, useEffect } from 'react';
import { BsTrash, BsEnvelope } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { BiCheckCircle, BiLink } from 'react-icons/bi';
import { DELETE_TASK_TO_PROJECT } from './../../actionTypes';
import { useStateValue } from './../../StateProvider';

const ProjectTaskModalOption = ({
  hide,
  id,
  edit,
  hideCompleted,
  hideCompletedhandler,
}) => {
  const wrapperRef = useRef(null);
  const [state, dispatch] = useStateValue();
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      hide();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  });

  const handleDeleteTask = () => {
    dispatch({
      type: DELETE_TASK_TO_PROJECT,
      task_id: id,
    });
    hide();
  };

  return (
    <div
      className="absolute top-0 right-0 transform mt-8 z-20 bg-white"
      style={{ width: '16rem' }}
      ref={wrapperRef}
    >
      <div className="shadow border border-gray-200 rounded">
        <div className="py-1 border-b border-gray-200">
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
            <span className="flex text-xs text-gray-600 py-2">Rename task</span>
          </div>
          <div
            className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full"
            onClick={() => {} /*handleDuplicateProject*/}
          >
            <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
              <BsEnvelope size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              Add comments via email
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
          <div
            className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
            onClick={hideCompletedhandler}
          >
            <span className="relative flex items-center justify-center h-8 w-8">
              <BiCheckCircle size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              {(hideCompleted ? 'Hide' : 'Show') + ' completed sub-tasks'}
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
            <span className="flex text-xs text-gray-600 py-2">Delete task</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskModalOption;
