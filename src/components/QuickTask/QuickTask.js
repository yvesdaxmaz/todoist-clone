import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import TaskEditor from './../TaskEditor/TaskEditor';

const QuickTask = props => {
  const wrapperRef = useRef(null);

  return (
    <div className="bg-white rounded-lg p-4" ref={wrapperRef}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-gray-800">Quick Add Task</h2>
        <FaTimes size="1.5em" />
      </div>
      <div>
        <TaskEditor />
      </div>
    </div>
  );
};

export default QuickTask;
