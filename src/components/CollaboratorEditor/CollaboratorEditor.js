import React, { useState } from 'react';
import { useStateValue } from './../../StateProvider';
import { ADD_COLLABORATOR_TO_PROJECT } from './../../actionTypes';
const CollaboratorEditor = ({ project }) => {
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState('');

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleSaveCollaborator = () => {
    if (email === '') {
      return false;
    }
    dispatch({
      type: ADD_COLLABORATOR_TO_PROJECT,
      collaborator: {
        email,
        project_id: project.id,
        createdAt: new Date(),
      },
    });
    setEmail('');
  };

  return (
    <div className="flex w-full space-x-4 items-center my-4">
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Enter email"
        className="flex-grow w-full p-1 rounded border border-gray-300 text-sm font-light text-gray-80 focus:outline-none"
        onChange={handleChangeEmail}
      />
      <button
        className="bg-red-600 text-xs font-bold text-white border border-transparent rounded py-2 px-4"
        onClick={handleSaveCollaborator}
      >
        Invite
      </button>
    </div>
  );
};

export default CollaboratorEditor;
