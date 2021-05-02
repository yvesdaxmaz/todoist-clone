import React, { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { GrAttachment, GrMicrophone, GrEmoji } from 'react-icons/gr';
import { useStateValue } from './../../StateProvider';
import { ADD_COMMENT_TO_PROJECT } from './../../actionTypes';
const CommentEditor = ({ type, subject }) => {
  const [comment, setComment] = useState('');
  const [editing, setEditing] = useState(false);
  const [state, dispatch] = useStateValue();
  const commentRef = useRef('');
  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleChangeComment = event => {
    setComment(event.target.value);
  };

  const handleSaveComment = () => {
    dispatch({
      type: ADD_COMMENT_TO_PROJECT,
      comment: {
        comment,
        type,
        subject_id: subject.id,
      },
    });
    setEditing(false);
    setComment('');
  };

  return (
    <div className="border border-gray-300 rounded p-2">
      <div className="relative w-full text-sm text-gra-y-600 pb-2">
        {!editing && (comment === '' || comment === '<br>') ? (
          <div
            className="w-full text-gray-300 text-sm"
            onClick={handleStartEditing}
          >
            Write a comment
          </div>
        ) : (
          <ContentEditable
            innerRef={commentRef}
            html={comment}
            disabled={false}
            tagName="div"
            className="w-full text-gray-600 break-all outline-none"
            onChange={handleChangeComment}
            onFocus={() => {
              setEditing(true);
            }}
            onBlur={() => {
              setEditing(false);
            }}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <button className="flex items-center justify-center h-8 w-8 rounded text-gray-400 hover:text-gray-600 bg-transparent hover:bg-gray-200 focus:outline-none">
            <GrAttachment />
          </button>
          <button className="flex items-center justify-center h-8 w-8 rounded text-gray-400 hover:text-gray-600 bg-transparent hover:bg-gray-200 focus:outline-none">
            <GrMicrophone />
          </button>
          <button className="flex items-center justify-center h-8 w-8 rounded text-gray-400 hover:text-gray-600 bg-transparent hover:bg-gray-200 focus:outline-none">
            <GrEmoji />
          </button>
        </div>
        <button
          className="bg-red-600 text-xs font-bold text-white border border-transparent rounded py-2 px-4"
          onClick={handleSaveComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentEditor;
