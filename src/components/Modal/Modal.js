import React, { useState, useRef, useEffect } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
import ColorSelector from './../../UI/ColorSelector/ColorSelector';
import Switch from './../../UI/Switch/Switch';
import ViewLayoutSelector from './../../UI/ViewLayoutSelector/ViewLayoutSelector';
import { useStateValue } from './../../StateProvider';
import {
  HIDE_ADD_PROJECT_MODAL,
  HIDE_EDIT_PROJECT_MODAL,
  ADD_PROJECT,
  SAVE_EDIT_PROJECT,
} from './../../actionTypes';

const Modal = ({ edit, selectedProject }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('bg-gray-300');
  const [favorited, setFavorited] = useState(false);
  const [view, setView] = useState('list');

  const [state, dispatch] = useStateValue();

  const wrapperRef = useRef(null);
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      dispatch({
        type: HIDE_ADD_PROJECT_MODAL,
      });
    }
  };
  const handleCancelEdit = () => {
    dispatch({
      type: HIDE_EDIT_PROJECT_MODAL,
    });
  };

  const handleSaveEditedProject = () => {
    dispatch({
      type: SAVE_EDIT_PROJECT,
      project: {
        ...selectedProject,
        name,
        color,
        favorited,
        view,
      },
    });
  };

  const handleCancelAdd = () => {
    dispatch({
      type: HIDE_ADD_PROJECT_MODAL,
    });
  };

  const handleAddProject = () => {
    if (name === '') {
      return;
    }
    dispatch({
      type: ADD_PROJECT,
      project: {
        name,
        color,
        favorited,
        view,
        archived: false,
      },
    });
    dispatch({
      type: HIDE_ADD_PROJECT_MODAL,
    });
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleChangeColor = color => {
    setColor(color);
  };
  const handleChangeView = view => {
    setView(view);
  };

  const handleChangeFavorited = favorited => {
    setFavorited(favorited);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  });

  useEffect(() => {
    if (edit) {
      setName(selectedProject.name);
      setColor(selectedProject.color);
      setFavorited(selectedProject.favorited);
      setView(selectedProject.view);
    }
  }, [selectedProject]);

  return (
    <div className="fixed h-screen w-full bg-gray-800 bg-opacity-50">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-md w-full h-full py-8" ref={wrapperRef}>
          <div className="w-full h-full">
            <div className="flex flex-col rounded-lg h-full">
              <div className="border-b border-gray-200 bg-gray-100 px-8 py-2 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-800 font-bold text-md">
                    {!edit ? 'Add project' : 'Edit project'}
                  </h2>
                  <Button
                    optinText="Click to find out about projects and how to use them."
                    classes={'text-white'}
                  >
                    <BsQuestionCircle />
                  </Button>
                </div>
              </div>
              <div className=" overflow-y-scroll p-8 bg-white">
                <div className="text-gray-800">
                  <div className="w-full mb-4">
                    <h3 className="text-sm text-gray-800 font-bold mb-2">
                      Name
                    </h3>
                    <input
                      type="text"
                      className="w-full border border-gray-100 focus:border-gray-300 text-sm rounded p-1 outline-none h-8"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <h3 className="text-sm text-gray-800 font-bold mb-2">
                      Color
                    </h3>
                    <ColorSelector
                      change={handleChangeColor}
                      selected={color}
                    />
                  </div>
                  <div>
                    <Switch
                      label="Add to favorites"
                      change={handleChangeFavorited}
                      enabled={favorited}
                    />
                  </div>

                  <div className="w-full mb-4">
                    <h3 className="text-sm text-gray-800 font-bold mb-2">
                      View
                    </h3>
                    <ViewLayoutSelector
                      change={handleChangeView}
                      selected={view}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <p className="text-sm text-gray-300">
                      View is synced between teammates in shared projects.
                      <span className="text-red-500"> Learn more.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 px-8 py-2 bg-white border-t border-gray-100 rounded-b-lg">
                {edit ? (
                  <>
                    <button
                      className="text-xs font-bold text-gray-800 bg-gray-200 border border-gray-300 hover:border-gray-600 rounded py-2 px-4"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>

                    <button
                      className={
                        (name === ''
                          ? 'bg-red-300 bg-opacity-75 '
                          : 'bg-red-600 ') +
                        'text-xs font-bold text-white border border-transparent rounded py-2 px-4'
                      }
                      onClick={handleSaveEditedProject}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-xs font-bold text-gray-800 bg-gray-200 border border-gray-300 hover:border-gray-600 rounded py-2 px-4"
                      onClick={handleCancelAdd}
                    >
                      Cancel
                    </button>
                    <button
                      className={
                        (name === ''
                          ? 'bg-red-300 bg-opacity-75 '
                          : 'bg-red-600 ') +
                        'text-xs font-bold text-white border border-transparent rounded py-2 px-4'
                      }
                      onClick={handleAddProject}
                    >
                      Add
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
