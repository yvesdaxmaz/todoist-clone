import React, { useRef, useEffect } from 'react';
import {
  BsTrash,
  BsEnvelope,
  BsLayoutThreeColumns,
  BsArchive,
  BsUpload,
  BsListTask,
} from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { FiPlusSquare } from 'react-icons/fi';
import { HiDownload } from 'react-icons/hi';
import { BiCheckCircle, BiDuplicate } from 'react-icons/bi';
import { DELETE_TASK_TO_PROJECT } from './../../actionTypes';
import { useStateValue } from './../../StateProvider';
import {
  ARCHIVE_PROJECT,
  UNARCHIVE_PROJECT,
  DELETE_PROJECT,
  DUPLICATE_PROJECT,
  FAVORITED_PROJECT,
  UNFAVORITED_PROJECT,
  SHOW_EDIT_PROJECT_MODAL,
} from './../../actionTypes';

const ProjectTaskModalOption = ({
  hide,
  id,
  project,
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

  const handleDuplicateProject = () => {
    dispatch({ type: DUPLICATE_PROJECT, id });
    hide();
  };

  const handleArchiveProject = () => {
    dispatch({
      type: ARCHIVE_PROJECT,
      id,
    });
    hide();
  };
  const handleUnarchiveProject = () => {
    dispatch({
      type: UNARCHIVE_PROJECT,
      id,
    });

    hide();
  };

  const handleDeleteProject = () => {
    dispatch({
      type: DELETE_PROJECT,
      id,
    });

    hide();
  };
  const handleShowEditProject = () => {
    dispatch({
      type: SHOW_EDIT_PROJECT_MODAL,
      id,
    });

    hide();
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
            onClick={handleShowEditProject}
          >
            <span className="relative flex items-center justify-center h-8 w-8">
              <RiEdit2Fill size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              Edit project
            </span>
          </div>
          <div
            className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
            onClick={() => {
              hide();
            }}
          >
            <span className="relative flex items-center justify-center h-8 w-8">
              <BsLayoutThreeColumns size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              <div className="flex items-center space-x-2">
                <span>View as board</span>
                <span className="block p-1 text-green-500 rounded bg-green-100">
                  New
                </span>
                <span className="ml-auto">V</span>
              </div>
            </span>
          </div>
        </div>
        <div className="py-1 border-b border-gray-200">
          <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
            <span className="relative flex items-center justify-center h-8 w-8">
              <FiPlusSquare size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">Add section</span>
          </div>
        </div>
        <div className="py-1 border-b border-gray-200">
          <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
            <span className="relative flex items-center justify-center h-8 w-8">
              <HiDownload size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              Import from template
            </span>
          </div>
          <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
            <span className="relative flex items-center justify-center h-8 w-8">
              <BsUpload size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              Export as a template
            </span>
          </div>
        </div>
        <div className="py-1 border-b border-gray-200">
          <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
            <span className="relative flex items-center justify-center h-8 w-8">
              <BiDuplicate size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              Duplicate project
            </span>
          </div>
          <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
            <span className="relative flex items-center justify-center h-8 w-8">
              <BsEnvelope size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              Email tasks to this project
            </span>
          </div>
          <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
            <span className="relative flex items-center justify-center h-8 w-8">
              <BsListTask size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">
              Project calendar feed
            </span>
          </div>
        </div>
        <div className="py-1 border-b border-gray-200">
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
            onClick={
              project.archived ? handleArchiveProject : handleUnarchiveProject
            }
          >
            <span className="relative flex items-center justify-center h-8 w-8">
              <BsArchive size="1.5em" />
            </span>
            <span className="flex text-xs text-gray-600 py-2">Archive</span>
          </div>
          <div
            className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
            onClick={handleDeleteProject}
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
