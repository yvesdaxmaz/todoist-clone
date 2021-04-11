import React, { useRef, useEffect } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
import ColorSelector from './../../UI/ColorSelector/ColorSelector';
import Switch from './../../UI/Switch/Switch';
import ViewLayoutSelector from './../../UI/ViewLayoutSelector/ViewLayoutSelector';
import { useStateValue } from './../../StateProvider';
import { HIDE_ADD_PROJECT_MODAL } from './../../actionTypes';

const Modal = props => {
  const [state, dispatch] = useStateValue();
  const wrapperRef = useRef(null);
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      dispatch({
        type: HIDE_ADD_PROJECT_MODAL,
      });
    }
  };
  const handleCancel = () => {
    dispatch({
      type: HIDE_ADD_PROJECT_MODAL,
    });
  };

  const handleAddProject = () => {};

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  });

  return (
    <div className="fixed h-screen w-full bg-gray-800 bg-opacity-50">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-md w-full h-full py-8" ref={wrapperRef}>
          <div className="w-full h-full">
            <div className="flex flex-col rounded-lg h-full">
              <div className="border-b border-gray-200 bg-gray-100 px-8 py-2 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-800 font-bold text-md">
                    Add project
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
                    />
                  </div>
                  <div className="w-full mb-4">
                    <h3 className="text-sm text-gray-800 font-bold mb-2">
                      Color
                    </h3>
                    <ColorSelector />
                  </div>
                  <div>
                    <Switch label="Add to favorites" />
                  </div>

                  <div className="w-full mb-4">
                    <h3 className="text-sm text-gray-800 font-bold mb-2">
                      View
                    </h3>
                    <ViewLayoutSelector />
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
                <button
                  className="text-xs font-bold text-gray-800 bg-gray-200 border border-gray-300 rounded py-2 px-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="text-xs font-bold text-white bg-red-600 border border-transparent rounded py-2 px-4">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
