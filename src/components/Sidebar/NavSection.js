import React, { useState } from 'react';
import { BsChevronDown, BsChevronRight, BsPlus } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
// import { CSSTransition } from 'react-transition-group';

const NavSection = ({ title, counter, children, isActive, add }) => {
  const [dropped, setDropped] = useState(false);
  const handleOnClick = e => {
    e.preventDefault();
    setDropped(!dropped);
  };

  return (
    <>
      <div className="flex p-2 space-x-4 items-center text-sm rounded transition duration-300">
        <div
          className="flex flex-grow items-center space-x-4"
          onClick={handleOnClick}
        >
          {!dropped ? <BsChevronRight /> : <BsChevronDown />}
          <span className="flex-grow text-gray-800 font-bold">{title}</span>
        </div>
        <Button bg="gray" bgOpacity={400} click={add}>
          <BsPlus size="1.5em" />
        </Button>
      </div>
      {dropped ? <nav>{children}</nav> : null}
    </>
  );
};

export default NavSection;
