import React, { useState } from 'react';
import { BsChevronDown, BsChevronRight, BsPlus } from 'react-icons/bs';
import Button from './../../UI/Button/Button';

const NavDropdownItem = ({ title, counter, children, isActive }) => {
  const [dropped, setDropped] = useState(false);
  const handleOnclick = () => {
    setDropped(!dropped);
  };
  return (
    <>
      <div
        className="flex p-2 space-x-4 items-center text-sm rounded transition duration-300"
        onClick={handleOnclick}
      >
        {dropped ? <BsChevronRight /> : <BsChevronDown />}
        <span className="flex-grow text-gray-800 font-bold">{title}</span>
        <Button bg="gray" bgOpacity={400}>
          <BsPlus size="1.5em" />
        </Button>
      </div>
      {dropped ?? <div>{children}</div>}
    </>
  );
};

export default NavDropdownItem;
