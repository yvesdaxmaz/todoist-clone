import React, { useState, useRef } from 'react';
import profile from './../../images/profile.jpeg';
import ContentEditable from 'react-contenteditable';
import Button from './../../UI/Button/Button';
import { RiEdit2Fill } from 'react-icons/ri';
import { GrEmoji } from 'react-icons/gr';
import { BsTrash } from 'react-icons/bs';
import { useStateValue } from './../../StateProvider';
import {
  DELETE_COMMENT_TO_PROJECT,
  UPDATE_COMMENT_OF_PROJECT,
} from './../../actionTypes';

const Comment = ({ comment }) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const commentTextRef = useRef('');
  const [state, dispatch] = useStateValue();

  const handleStartEditing = () => {
    setCommentText(comment.comment);
    setEditing(true);
  };
  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleDeleteComment = () => {
    dispatch({
      type: DELETE_COMMENT_TO_PROJECT,
      comment_id: comment.id,
    });
  };
  const handleUpdateComment = () => {
    dispatch({
      type: UPDATE_COMMENT_OF_PROJECT,
      comment_id: comment.id,
      comment_text: commentText,
    });
    setEditing(false);
  };
  const handleChangeCommentText = event => {
    setCommentText(event.target.value);
  };
  return (
    <div
      className="flex space-x-4 mb-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-8 w-8">
        <img src={profile} alt="" className="w-full rounded-full" />
      </div>
      {editing ? (
        <div className="flex-grow">
          <div className="border border-gray-300 rounded p-2 mb-2 text-sm min-h-48">
            <ContentEditable
              innerRef={commentTextRef}
              html={commentText}
              disabled={false}
              tagName="div"
              className="w-full text-gray-600 break-all outline-none"
              onChange={handleChangeCommentText}
            />
          </div>
          <div className="flex space-x-2">
            <button
              className="bg-red-600 text-xs font-bold text-white border border-transparent rounded py-2 px-4 focus:outline-none"
              onClick={handleUpdateComment}
            >
              Update
            </button>
            <button
              className="text-xs font-medium hover:underline text-gray-600 border border-transparent rounded py-2 px-4 focus:outline-none"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-2">
          <div className="flex items-center space-x-2 text-gray-800">
            <div className="flex space-x-2 py-2">
              <h3 className="text-sm font-bold">yvesdaxmaz</h3>
              <span className="text-xs font-light text-gray-400">
                Apr 30 1:27 AM
              </span>
            </div>
            {hovered ? (
              <div className="flex items-center space-x-2 text-gray-300">
                <Button
                  bg="gray"
                  bgOpacity="100"
                  optinText="Edit comment"
                  className="group"
                  click={handleStartEditing}
                >
                  <RiEdit2Fill
                    size="1.2em"
                    className="group-hover:text-gray-600 text-gray-400"
                  />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="100"
                  optinText="Delete comment"
                  className="group"
                  click={handleDeleteComment}
                >
                  <BsTrash
                    size="1.2em"
                    className="group-hover:text-gray-600 text-gray-400"
                  />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="100"
                  optinText="Add reaction"
                  className="group"
                >
                  <GrEmoji
                    size="1.2em"
                    className="group-hover:text-gray-600 text-gray-400"
                  />
                </Button>
              </div>
            ) : null}
          </div>
          <div
            className="text-sm font-gray-800"
            dangerouslySetInnerHTML={{ __html: comment.comment }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Comment;
