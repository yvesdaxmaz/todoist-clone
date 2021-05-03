import React, { useState } from 'react';
import { BsCalendar, BsThreeDots } from 'react-icons/bs';
import { GrDrag } from 'react-icons/gr';
import { RiEdit2Fill } from 'react-icons/ri';
import { GoComment } from 'react-icons/go';
import { CgListTree } from 'react-icons/cg';
import Button from './../../UI/Button/Button';
import TaskEditor from './../TaskEditor/TaskEditor';
import { Link } from 'react-router-dom';
import { useStateValue } from './../../StateProvider';
import TaskOptions from './TaskOptions';

const Task = ({ task, clicked }) => {
  const [editing, setEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [{ labels, comments, tasks }, dispatch] = useStateValue();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleStartEditing = () => {
    setEditing(true);
  };
  const handleCancelEditing = () => {
    setEditing(false);
  };
  const handleUpdateCompleted = () => {
    setEditing(false);
  };

  let attachedLabelsTags = task.labels.map(id => {
    let label = labels.find(currentLabel => currentLabel.id === id);
    return (
      <div
        className="text-xs text-gray-600 hover:underline"
        key={`${label.name}-${label.id}`}
      >
        <Link to={`/app/label/${label.name}`}>
          <span>{label.name}</span>
        </Link>
      </div>
    );
  });

  const current_task_comments = comments.filter(
    comment =>
      comment.type === 'task' && comment.subject_id === parseInt(task.id),
  );

  const current_task_subtasks = tasks.filter(
    current_task => current_task.parent_id === task.id,
  );

  return (
    <div className="relative">
      {!editing ? (
        <div
          className="relative flex items-start space-x-4 py-2 border-b border-gray-100"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={clicked}
        >
          <div className="h-5 w-5 border border-gray-600 rounded-full"></div>
          <div className="flex-grow text-sm text-gray-800 py-1">
            <div dangerouslySetInnerHTML={{ __html: task.description }}></div>
            <div className="flex items-center space-x-1 mt-2">
              {current_task_subtasks.length > 0 ? (
                <div className="flex items-center space-x-1">
                  <CgListTree size="0.8em" />
                  <span className="text-xs text-gray-600">
                    {current_task_subtasks.length}
                  </span>
                </div>
              ) : null}
              {current_task_comments.length > 0 ? (
                <div className="flex items-center space-x-1">
                  <GoComment size="0.8em" />
                  <span className="text-xs text-gray-600">
                    {current_task_comments.length}
                  </span>
                </div>
              ) : null}
              {attachedLabelsTags.length > 0 ? (
                <div className="flex items-center space-x-1">
                  {attachedLabelsTags}
                </div>
              ) : null}
            </div>
          </div>
          {hovered ? (
            <div className="flex items-center space-x-2 text-gray-300">
              <Button
                bg="gray"
                bgOpacity="400"
                optinText="Edit"
                shortcutKey="Alt"
                click={handleStartEditing}
              >
                <RiEdit2Fill size="1.3em" className="text-gray-400" />
              </Button>
              <Button bg="gray" bgOpacity="400" optinText="Schedule">
                <BsCalendar size="1.3em" className="text-gray-400" />
              </Button>
              <Button bg="gray" bgOpacity="400" optinText="Comment">
                <GoComment size="1.3em" className="text-gray-400" />
              </Button>
              <Button
                bg="gray"
                bgOpacity="400"
                optinText="More project actions"
                click={handleShowMenu}
              >
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
      ) : (
        <TaskEditor
          task={task}
          cancelled={handleCancelEditing}
          completed={handleUpdateCompleted}
        />
      )}
      {showMenu ? (
        <TaskOptions
          id={task.id}
          hide={() => setShowMenu(false)}
          edit={() => setEditing(true)}
        />
      ) : null}
    </div>
  );
};
export default Task;
