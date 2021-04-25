import React, { useState, useEffect } from 'react';
import { BsCheck } from 'react-icons/bs';

const ViewLayoutSelector = ({ change, selected }) => {
  const [layout, setLayout] = useState('list');
  const [listLayoutHovered, setListLayoutHovered] = useState(false);
  const [boardLayoutHovered, setBoardLayoutHovered] = useState(false);

  const handleChangeLayout = selectedLayout => {
    setLayout(selectedLayout);
    change(selectedLayout);
  };

  useEffect(() => {
    setLayout(selected);
  }, [selected]);

  return (
    <div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <div
            className={
              (layout === 'list'
                ? 'border-red-500 hover:border-red-500'
                : 'border-gray-200 hover:border-gray-500') +
              ' group border rounded mb-2'
            }
            onMouseEnter={() => setListLayoutHovered(true)}
            onMouseLeave={() => setListLayoutHovered(false)}
            onClick={() => handleChangeLayout('list')}
          >
            <div className="flex space-x-2 items-center px-6 py-2 border-b border-gray-200 group-hover:border-gray-300">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
            <div className="flex space-x-2 items-center px-6 py-2 border-b border-gray-200 group-hover:border-gray-300">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
            <div className="flex space-x-2 items-center px-6 py-2 border-b border-gray-200 group-hover:border-gray-300">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
            <div className="flex space-x-2 items-center px-6 py-2 border-b border-gray-200 group-hover:border-gray-300">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
          </div>
          <div
            className="flex items-center space-x-4"
            onClick={() => handleChangeLayout('list')}
            onMouseEnter={() => setListLayoutHovered(true)}
            onMouseLeave={() => setListLayoutHovered(false)}
          >
            <div
              className={
                (layout === 'list'
                  ? 'bg-red-600 text-white border-transparent'
                  : listLayoutHovered
                  ? 'bg-gray-100 text-gray-600 '
                  : 'text-gray-300 border-gray-300') +
                ' flex items-center justify-center h-5 w-5 rounded-full border'
              }
            >
              {layout === 'list' ? <BsCheck size="0.8em" /> : null}
              {layout !== 'list' && listLayoutHovered ? (
                <BsCheck size="0.8em" />
              ) : null}
            </div>
            <span
              className="flex-grow"
              onClick={() => handleChangeLayout('list')}
            >
              List
            </span>
          </div>
        </div>
        <div className="w-1/2">
          <div
            className={
              (layout === 'board'
                ? 'border-red-500 hover:border-red-500'
                : 'border-gray-200 hover:border-gray-500') +
              ' grid group grid-cols-2 gap-2 pt-2 pb-1 px-1 border rounded mb-2'
            }
            onMouseEnter={() => setBoardLayoutHovered(true)}
            onMouseLeave={() => setBoardLayoutHovered(false)}
            onClick={() => handleChangeLayout('board')}
          >
            <div className="flex space-x-2 items-center px-1 py-2 border border-gray-300 group-hover:border-gray-400 rounded ">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
            <div className="flex space-x-2 items-center px-1 py-2 border border-gray-300 group-hover:border-gray-400 rounded ">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
            <div className="flex space-x-2 items-center px-1 py-2 border border-gray-300 group-hover:border-gray-400 rounded ">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
            <div className="flex space-x-2 items-center px-1 py-2 border border-gray-300 group-hover:border-gray-400 rounded ">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
            <div className="flex space-x-2 items-center px-1 py-2 border border-gray-300 group-hover:border-gray-400 rounded ">
              <span className="h-3 w-3 rounded-full border border-gray-200"></span>
              <span className="h-3 flex-grow rounded-full bg-gray-200 group-hover:bg-gray-300"></span>
            </div>
          </div>
          <div
            className="flex items-center space-x-4"
            onClick={() => handleChangeLayout('board')}
            onMouseEnter={() => setBoardLayoutHovered(true)}
            onMouseLeave={() => setBoardLayoutHovered(false)}
          >
            <div
              className={
                (layout === 'board'
                  ? 'bg-red-600 text-white border-transparent'
                  : boardLayoutHovered
                  ? 'bg-gray-100 text-gray-600 '
                  : 'text-gray-300 border-gray-300') +
                ' flex items-center justify-center h-5 w-5 rounded-full border'
              }
            >
              {layout === 'board' ? <BsCheck size="0.8em" /> : null}
              {layout !== 'board' && boardLayoutHovered ? (
                <BsCheck size="0.8em" />
              ) : null}
            </div>
            <span
              className="flex-grow"
              onClick={() => handleChangeLayout('board')}
            >
              Board
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLayoutSelector;
