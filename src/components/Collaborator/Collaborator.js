import React, { useState } from 'react';
import { useStateValue } from './../../StateProvider';
import { BsTrash } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
import { DELETE_COLLABORATOR_TO_PROJECT } from './../../actionTypes';

const Collaborator = ({ collaborator }) => {
  const [state, dispatch] = useStateValue();
  const [hovered, setHovered] = useState(false);

  const handleDeleteCollaborator = () => {
    dispatch({
      type: DELETE_COLLABORATOR_TO_PROJECT,
      collaborator_id: collaborator.id,
    });
  };

  return (
    <div
      className="w-full flex space-x-4 group py-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-center text-base h-6 w-6 rounded-full border text-sm text-red-500 font-bold border-red-600">
        {collaborator.email.charAt(0)}
      </div>
      <div className="flex-grow">
        <div className="flex space-x-2 text-xs">
          <span className="font-bold text-gray-900">
            {collaborator.email.split('@')[0]}
          </span>
          <span className=" flex items-center justify-center px-1 block text-white bg-blue-400 uppercase rounded">
            pending
          </span>
        </div>
        <div className="text-gray-600 text-xs">{collaborator.email}</div>
      </div>
      <div>
        {hovered ? (
          <Button
            bg="gray"
            bgOpacity="100"
            optinText="Remove collaborator"
            className="group"
            classes="text-white"
            click={handleDeleteCollaborator}
          >
            <BsTrash
              size="1.2em"
              className="group-hover:text-gray-600 text-gray-400"
            />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Collaborator;
