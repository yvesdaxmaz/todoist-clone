import React, { useState, useEffect, useRef } from 'react';
import {
  BsArrowUp,
  BsArrowDown,
  BsPlus,
  BsHeart,
  BsArchive,
  BsTrash,
  BsEnvelope,
} from 'react-icons/bs';
import { RiEdit2Fill, RiInboxUnarchiveLine } from 'react-icons/ri';
import { BiUserPlus, BiDuplicate } from 'react-icons/bi';
import { MdFormatListBulleted } from 'react-icons/md';
import { useStateValue } from './../../StateProvider';
import {
  ARCHIVE_PROJECT,
  DELETE_PROJECT,
  DUPLICATE_PROJECT,
  FAVORITED_PROJECT,
  UNFAVORITED_PROJECT,
} from './../../actionTypes';

const NavItemOption = ({ enableld, hide, archived, id, favorited }) => {
  const [state, dispatch] = useStateValue();
  const wrapperRef = useRef(null);
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      hide();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  });
  const handleDuplicateProject = () => {
    dispatch({ type: DUPLICATE_PROJECT, id });
    hide();
  };

  const handleArchiveProject = () => {
    dispatch({
      type: ARCHIVE_PROJECT,
      id,
    });
  };

  const handleDeleteProject = () => {
    dispatch({
      type: DELETE_PROJECT,
      id,
    });
  };

  const handleFavoritedProject = () => {
    dispatch({
      type: FAVORITED_PROJECT,
      id,
    });
    hide();
  };

  const handleUnfavoritedProject = () => {
    dispatch({
      type: UNFAVORITED_PROJECT,
      id,
    });
  };
  return (
    <div
      className="absolute top-0 left-0 transform translate-x-1/2 mt-4 z-20 bg-white"
      style={{ width: '16rem' }}
      ref={wrapperRef}
    >
      {favorited ? (
        <div className="shadow border border-gray-200 rounded">
          <div className="py-1 border-b border-gray-200">
            <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full">
              <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                <RiEdit2Fill size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Edit project
              </span>
            </div>
            <div
              className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
              onClick={handleUnfavoritedProject}
            >
              <span className="relative flex items-center justify-center h-8 w-8">
                <BsHeart size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Remove from favorites
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="shadow border border-gray-200 rounded">
          {archived === false ? (
            <>
              <div className="py-1 border-b border-gray-200">
                <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full">
                  <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                    <BsArrowUp size="1.5em" />
                    <BsPlus className="absolute bottom-0 right-0 transform mb-1" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Add project above
                  </span>
                </div>
                <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
                  <span className="relative flex items-center justify-center h-8 w-8">
                    <BsArrowDown size="1.5em" />
                    <BsPlus className="absolute top-0 right-0 transform mt-1" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Add project below
                  </span>
                </div>
              </div>
              <div className="py-1 border-b border-gray-200">
                <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full">
                  <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                    <RiEdit2Fill size="1.5em" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Edit project
                  </span>
                </div>
                <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
                  <span className="relative flex items-center justify-center h-8 w-8">
                    <BiUserPlus size="1.5em" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Share project
                  </span>
                </div>
                <div
                  className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
                  onClick={handleFavoritedProject}
                >
                  <span className="relative flex items-center justify-center h-8 w-8">
                    <BsHeart size="1.5em" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Add to favorites
                  </span>
                </div>
              </div>
              <div className="py-1 border-b border-gray-200">
                <div
                  className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full"
                  onClick={handleDuplicateProject}
                >
                  <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                    <BiDuplicate size="1.5em" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Duplicate project
                  </span>
                </div>
                <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
                  <span className="relative flex items-center justify-center h-8 w-8">
                    <BsEnvelope size="1.5em" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Email tasks to this project
                  </span>
                </div>
                <div className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400">
                  <span className="relative flex items-center justify-center h-8 w-8">
                    <MdFormatListBulleted size="1.5em" />
                  </span>
                  <span className="flex text-xs text-gray-600 py-2">
                    Project calendar feed
                  </span>
                </div>
              </div>
            </>
          ) : null}

          <div className="py-1 border-b border-gray-200">
            <div
              className="flex items-center space-x-4 h-8  hover:bg-gray-100 w-full"
              onClick={handleArchiveProject}
            >
              <span className="relative flex items-center justify-center h-8 w-8 text-gray-400">
                {!archived ? (
                  <BsArchive size="1.5em" />
                ) : (
                  <RiInboxUnarchiveLine />
                )}
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                {!archived ? 'Archive project' : 'Unarchive'}
              </span>
            </div>
            <div
              className="flex items-center space-x-4 h-8  hover:bg-gray-100 text-gray-400"
              onClick={handleDeleteProject}
            >
              <span className="relative flex items-center justify-center h-8 w-8">
                <BsTrash size="1.5em" />
              </span>
              <span className="flex text-xs text-gray-600 py-2">
                Delete project
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItemOption;
