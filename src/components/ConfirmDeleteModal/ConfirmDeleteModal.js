import React, { useRef, useEffect } from 'react';
import { useStateValue } from './../../StateProvider';
import {
  DELETE_PROJECT_CANCEL,
  DELETE_PROJECT_CONFIRM,
  DELETE_COMMENT_TO_PROJECT_CANCEL,
  DELETE_COMMENT_TO_PROJECT_CONFIRM,
  DELETE_TASK_TO_PROJECT_CANCEL,
  DELETE_TASK_TO_PROJECT_CONFIRM,
} from './../../actionTypes';
import { BsInfoCircle } from 'react-icons/bs';
import { useHistory, useRouteMatch, useLocation } from 'react-router';

const ConfirmDeleteModal = props => {
  const wrapperRef = useRef(null);
  let total_deleted_tasks = null;
  const [
    { delete_project, delete_comment, delete_task, tasks },
    dispatch,
  ] = useStateValue();
  let history = useHistory();
  let location = useLocation();
  let { url } = useRouteMatch();
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if (delete_project) {
        dispatch({
          type: DELETE_PROJECT_CANCEL,
        });
      }
      if (delete_comment) {
        dispatch({
          type: DELETE_COMMENT_TO_PROJECT_CANCEL,
        });
      }
      if (delete_task) {
        dispatch({
          type: DELETE_TASK_TO_PROJECT_CANCEL,
        });
      }
    }
  };

  const handleCancelDelete = () => {
    if (delete_project) {
      dispatch({
        type: DELETE_PROJECT_CANCEL,
      });
    }
    if (delete_comment) {
      dispatch({
        type: DELETE_COMMENT_TO_PROJECT_CANCEL,
      });
    }

    if (delete_task) {
      dispatch({
        type: DELETE_TASK_TO_PROJECT_CANCEL,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (delete_project) {
      dispatch({
        type: DELETE_PROJECT_CONFIRM,
      });
      history.push('/app/today');
    }
    if (delete_comment) {
      dispatch({
        type: DELETE_COMMENT_TO_PROJECT_CONFIRM,
      });
      history.push(location.pathname);
    }

    if (delete_task) {
      dispatch({
        type: DELETE_TASK_TO_PROJECT_CONFIRM,
      });
      history.push(location.pathname);
    }
  };
  if (delete_task) {
    total_deleted_tasks = tasks.filter(current_task => {
      return (
        current_task.id === delete_task.id ||
        (current_task.parent_type === 'task' &&
          current_task.parent_id === delete_task.id)
      );
    });
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  return (
    <div className="fixed h-screen w-full bg-gray-800 bg-opacity-50">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-sm w-full py-8">
          <div className="bg-white rounded-lg" ref={wrapperRef}>
            <div className="flex items-center justify-between px-8 pt-4">
              <BsInfoCircle size="1.2em" />
            </div>
            <div className=" overflow-y-scroll px-8 py-4 bg-white">
              <div className="text-gray-800">
                <div className="w-full text-sm text-gray-600">
                  Are you sure you want to delete
                  {delete_project ? (
                    <span className="text-gray-800 font-bold">
                      {` ${delete_project.name}?`}
                    </span>
                  ) : delete_task ? (
                    <span className="font-bold">
                      {total_deleted_tasks.length} tasks?
                    </span>
                  ) : (
                    <>{` this?`}</>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 px-8 py-2 bg-white border-t border-gray-100 rounded-b-lg">
              <button
                className="text-xs font-bold text-gray-800 bg-gray-200 border border-gray-300 hover:border-gray-600 rounded py-2 px-4"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-xs font-bold text-white border border-transparent rounded py-2 px-4"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDeleteModal;
