import React, { useState, useEffect } from 'react';
import { BsCheck } from 'react-icons/bs';

const ViewLayoutSelector = ({ change, selected }) => {
  const [layout, setLayout] = useState('list');

  const handleChangeLayout = selectedLayout => {
    setLayout(selectedLayout);
    change(selectedLayout);
  };

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
          <div className="flex items-center space-x-4">
            <div
              className={
                (layout === 'list'
                  ? 'bg-red-600 text-white border-transparent'
                  : 'text-gray-300 border-gray-300') +
                ' flex items-center justify-center h-5 w-5 rounded-full border'
              }
              onClick={() => handleChangeLayout('list')}
            >
              {layout === 'list' ? <BsCheck size="0.8em" /> : null}
            </div>
            <span onClick={() => handleChangeLayout('list')}>List</span>
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
          <div className="flex items-center space-x-4">
            <div
              className={
                (layout === 'board'
                  ? 'bg-red-600 text-white border-transparent'
                  : 'text-gray-300 border-gray-300') +
                ' flex items-center justify-center h-5 w-5 rounded-full border'
              }
              onClick={() => handleChangeLayout('board')}
            >
              {layout === 'board' ? <BsCheck size="0.8em" /> : null}
            </div>
            <span onClick={() => handleChangeLayout('board')}>Board</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLayoutSelector;
