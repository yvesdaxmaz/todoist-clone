import React, { useState } from 'react';
import { BsCheck, BsCalendar, BsThreeDots } from 'react-icons/bs';
import { GrDrag } from 'react-icons/gr';
import { RiEdit2Fill } from 'react-icons/ri';
import { GoComment } from 'react-icons/go';
import Button from './../../UI/Button/Button';

const Task = ({ task }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex items-center space-x-4 py-2 border-b border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-5 w-5 border border-gray-600 rounded-full"></div>
      <div className="flex-grow text-sm text-gray-800 py-1">
        Tap the checkbox to complete this task ✅
      </div>
      {hovered ? (
        <div className="flex items-center space-x-2 text-gray-300">
          <Button bg="gray" bgOpacity="400" optinText="Edit" shortcutKey="Alt">
            <RiEdit2Fill size="1.3em" className="text-gray-400" />
          </Button>
          <Button bg="gray" bgOpacity="400" optinText="Schedule">
            <BsCalendar size="1.3em" className="text-gray-400" />
          </Button>
          <Button bg="gray" bgOpacity="400" optinText="Comment">
            <GoComment size="1.3em" className="text-gray-400" />
          </Button>
          <Button bg="gray" bgOpacity="400" optinText="More project actions">
            <BsThreeDots size="1.3em" />
          </Button>
        </div>
      ) : null}
      <div
        className={
          (hovered ? 'block' : 'hidden') +
          ' absolute h-full w-8 flex items-center justify-center top-0 left-0 transform -translate-x-10'
        }
      >
        <GrDrag size="1em" className="text-gray-600" />
      </div>
    </div>
  );
};
export default Task;
