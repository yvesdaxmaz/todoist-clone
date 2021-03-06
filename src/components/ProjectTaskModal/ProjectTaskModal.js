import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import CommentEditor from './../CommentEditor/CommentEditor';
import Comment from './../Comment/Comment';
import { useStateValue } from './../../StateProvider';
import {
  BsCalendar,
  BsInbox,
  BsFlag,
  BsPlus,
  BsCheck,
  BsListTask,
  BsThreeDots,
} from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import { IoMdPricetag } from 'react-icons/io';
import { CgListTree } from 'react-icons/cg';
import TaskEditor from './../TaskEditor/TaskEditor';
import Task from './../Task/Task';
import Button from './../../UI/Button/Button';
import ProjectTaskModalOption from './ProjectTaskModalOption';
import {
  MARK_TASK_AS_COMPLETED,
  MARK_TASK_AS_UNCOMPLETED,
} from './../../actionTypes';

const ProjectTaskModal = ({ project, task, match, location, history }) => {
  const wrapperRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const { url } = match;
  const [addTask, setAddTask] = useState(false);
  const [selectedTab, setSelectedTab] = useState('subtask');
  const [editing, setEditing] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [{ comments, tasks, labels }, dispatch] = useStateValue();
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      handleCloseCommentModal();
    }
  };
  const handleCompletedTask = () => {
    dispatch({
      type: MARK_TASK_AS_COMPLETED,
      task_id: task.id,
    });
  };

  const handleUncompletedTask = () => {
    dispatch({
      type: MARK_TASK_AS_UNCOMPLETED,
      task_id: task.id,
    });
  };

  const handleTaskDoubleClick = taskId => {
    let pathRegex = /^\/app\/project\/(\d+)\/task\/(\d+)$/;
    let matches = url.match(pathRegex);
    if (matches) {
      let new_path = url.replace(pathRegex, (match, p1, p2) => {
        return `/app/project/${p1}/task/${taskId}`;
      });
      history.push(new_path);
    } else {
      history.push(`${url}/task/${taskId}`);
    }
  };
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

  const handleAddTask = () => {
    setAddTask(true);
  };

  const handleCancelAddTask = () => {
    setAddTask(false);
  };

  const handleAddTaskCompleted = () => {
    setAddTask(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  const handleHideCompletedTask = () => {
    setHideCompleted(!hideCompleted);
  };

  const handleCloseCommentModal = () => {
    let current_path_name = location.pathname;
    let new_path_url = current_path_name.replace(/\/task\/\d+/, '');
    history.push(new_path_url);
  };
  const handleSwitchTab = tab => {
    setSelectedTab(tab);
  };

  const current_task_comments = comments.filter(
    comment =>
      comment.type === 'task' && comment.subject_id === parseInt(task.id),
  );

  const current_task_uncompleted_tasks = tasks.filter(current_task => {
    return (
      current_task.project_id === project.id &&
      current_task.parent_type === 'task' &&
      current_task.parent_id === parseInt(task.id) &&
      !current_task.completed
    );
  });

  const current_task_completed_tasks = tasks.filter(current_task => {
    return (
      current_task.project_id === project.id &&
      current_task.parent_type === 'task' &&
      current_task.parent_id === parseInt(task.id) &&
      current_task.completed
    );
  });

  const current_task_parent = tasks.find(
    current_task =>
      current_task.id === task.parent_id && current_task.parent_type === 'task',
  );

  let current_task_labels_tags = task.labels.map(id => {
    let label = labels.find(currentLabel => currentLabel.id === id);
    return (
      <Button
        texted
        bg="gray"
        bgOpacity="400"
        bordered
        to={`/app/label/${label.name}`}
      >
        <span className="text-xs">{label.name}</span>
      </Button>
    );
  });

  return (
    <div className="fixed h-screen w-full bg-gray-800 bg-opacity-50 top-0 left-0">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full py-8">
          <div
            className="flex flex-grow flex-col max-w-2xl w-full h-full bg-white rounded-lg p-4"
            ref={wrapperRef}
          >
            <div className="flex items-center justify-between py-2">
              <h2 className="flex items-center space-x-2 text-sm text-gray-800">
                {current_task_parent ? (
                  <>
                    <CgListTree size="1.5em" />
                    <span>{current_task_parent.description}</span>
                  </>
                ) : (
                  <>
                    {project.name === 'Index' ? (
                      <BsInbox className="text-blue-600" size="1.5em" />
                    ) : (
                      <div
                        className={`h-2 w-2 rounded-full ${project.color}`}
                      ></div>
                    )}
                    <span>{project.name}</span>
                  </>
                )}
              </h2>
              <FaTimes size="1.5em" onClick={handleCloseCommentModal} />
            </div>
            {!editing ? (
              <div className="flex items-start  space-x-4">
                <div
                  className={
                    'flex items-center justify-center h-5 w-5 border border-gray-600 rounded-full group ' +
                    (task.completed ? 'bg-gray-600' : 'hover:bg-gray-200')
                  }
                  onClick={
                    !task.completed
                      ? handleCompletedTask
                      : handleUncompletedTask
                  }
                >
                  <BsCheck
                    size="0.8em"
                    className={
                      task.completed ? 'text-white' : 'hidden group-hover:block'
                    }
                  />
                </div>
                <div className="flex-grow text-base text-gray-800 py-1">
                  <div
                    onClick={event => {
                      if (event.detail === 2) {
                        handleStartEditing();
                      }
                    }}
                    dangerouslySetInnerHTML={{ __html: task.description }}
                    className={
                      task.completed ? 'line-through text-gray-600' : ''
                    }
                  ></div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Button texted bg="gray" bgOpacity="400" bordered>
                      <div className="text-gray-500">
                        <BsCalendar />
                      </div>
                      <span className="text-xs">Schedule</span>
                    </Button>
                    {current_task_labels_tags ? current_task_labels_tags : null}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <TaskEditor
                  task={task}
                  cancelled={handleCancelEditing}
                  completed={handleUpdateCompleted}
                />
              </div>
            )}
            <div className="py-2">
              <div className="relative flex items-center justify-end space-x-2 text-gray-300">
                <Button
                  bg="gray"
                  bgOpacity="400"
                  optinText="Select a project"
                  shortcutKey="#"
                  click={handleStartEditing}
                >
                  <BsListTask size="1.3em" className="text-gray-400" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="400"
                  shortcutKey="@"
                  optinText="Add label"
                >
                  <IoMdPricetag size="1.3em" className="text-gray-400" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="400"
                  shortcutKey="p1"
                  optinText="Set the priority"
                >
                  <BsFlag size="1.3em" className="text-gray-400" />
                </Button>
                <Button bg="gray" bgOpacity="400" optinText="Add reminder(s)">
                  <GiAlarmClock size="1.3em" />
                </Button>
                <Button
                  bg="gray"
                  bgOpacity="400"
                  optinText="More task actions"
                  click={handleShowMenu}
                >
                  <BsThreeDots size="1.3em" />
                </Button>
                {showMenu ? (
                  <ProjectTaskModalOption
                    hideCompleted={hideCompleted}
                    hideCompletedhandler={handleHideCompletedTask}
                    id={task.id}
                    hide={() => setShowMenu(false)}
                    edit={handleStartEditing}
                  />
                ) : null}
              </div>
            </div>

            <div className="flex border-b border-gray-200">
              <div
                className={
                  'w-1/2 text-sm text-center py-2' +
                  (selectedTab === 'subtask'
                    ? ' font-bold border-b border-gray-400'
                    : '')
                }
                onClick={() => handleSwitchTab('subtask')}
              >
                Sub-tasks
              </div>
              <div
                className={
                  'flex space-x-1 justify-center items-center w-1/2 text-sm py-2' +
                  (selectedTab === 'comment'
                    ? ' font-bold border-b border-gray-400'
                    : '')
                }
                onClick={() => handleSwitchTab('comment')}
              >
                <span>Comments</span>
                {current_task_comments ? (
                  <span className="text-xs text-gray-600 font-light">
                    {current_task_comments.length}
                  </span>
                ) : null}
              </div>
              <div
                className={
                  'w-1/2 text-sm text-center py-2' +
                  (selectedTab === 'activity'
                    ? ' font-bold border-b border-gray-400'
                    : '')
                }
                onClick={() => handleSwitchTab('activity')}
              >
                Activity
              </div>
            </div>
            {selectedTab === 'subtask' ? (
              <div className="flex flex-grow flex-col overflow-y-scroll">
                <div className="flex-grow">
                  <div className="">
                    {current_task_uncompleted_tasks.map(taskItem => {
                      return (
                        <Task
                          task={{ ...taskItem }}
                          key={`task-${taskItem.id}`}
                          clicked={event => {
                            if (event.detail === 2) {
                              handleTaskDoubleClick(taskItem.id);
                            }
                          }}
                        />
                      );
                    })}
                  </div>

                  {!addTask ? (
                    <div
                      className="flex space-x-2 group py-2"
                      onClick={handleAddTask}
                    >
                      <div className="flex items-center justify-center h-5 w-5 rounded-full group-hover:bg-red-500">
                        <BsPlus
                          size="1.2em"
                          className="text-red-500 group-hover:text-white"
                        />
                      </div>

                      <span className="text-sm text-gray-600 group-hover:text-red-500">
                        Add sub-task
                      </span>
                    </div>
                  ) : (
                    <div className="py-2">
                      <TaskEditor
                        type={'task'}
                        parent={task}
                        cancelled={handleCancelAddTask}
                        completed={handleAddTaskCompleted}
                      />
                    </div>
                  )}
                  {hideCompleted ? (
                    <>
                      <div className="">
                        {current_task_completed_tasks.map(current_task => {
                          return (
                            <Task
                              task={{ ...current_task }}
                              key={`task-${current_task.id}`}
                              clicked={event => {
                                if (event.detail === 2) {
                                  handleTaskDoubleClick(current_task.id);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
            {selectedTab === 'comment' ? (
              <div className="flex flex-grow flex-col overflow-y-scroll">
                <div className="flex-grow">
                  {current_task_comments.length === 0 ? (
                    <div className="min-h-full flex flex-col items-center justify-center">
                      <div className="w-48 h-48">
                        <svg
                          data-svgs-path="theme_todoist/project_comments.svg"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="1.5"
                          clip-rule="evenodd"
                          viewBox="0 0 220 200"
                        >
                          <g transform="translate(-2800 -740)">
                            <g id="ProjectComments">
                              <path
                                fill="none"
                                d="M1800-100h300v300h-300z"
                                transform="matrix(.73333 0 0 .66667 1480 806.667)"
                              ></path>
                              <g transform="translate(-300.283 -876.614)">
                                <g id="ProjectCommentsA">
                                  <path
                                    fill="#f9e4e2"
                                    stroke="#f9e4e2"
                                    stroke-width="2.001"
                                    d="M3142.316 1760.895h13.136v12.534h-13.136z"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#fff"
                                    stroke-linecap="butt"
                                    stroke-linejoin="miter"
                                    stroke-width="2"
                                    d="M3144.95 1766.843l2.58 2.921 5.295-5.2"
                                  ></path>
                                  <path
                                    fill="#f9e4e2"
                                    stroke="#f9e4e2"
                                    stroke-width="2.001"
                                    d="M3142.316 1778.181h13.136v12.534h-13.136z"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#fff"
                                    stroke-linecap="butt"
                                    stroke-linejoin="miter"
                                    stroke-width="2"
                                    d="M3144.95 1784.123l2.58 2.921 5.295-5.2"
                                  ></path>
                                  <path
                                    fill="#f9e4e2"
                                    stroke="#f9e4e2"
                                    stroke-width="2.001"
                                    d="M3142.316 1795.466h13.136V1808h-13.136z"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#fff"
                                    stroke-linecap="butt"
                                    stroke-linejoin="miter"
                                    stroke-width="2"
                                    d="M3144.95 1801.413l2.58 2.921 5.295-5.2"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.94"
                                    d="M16637 1390h110"
                                    transform="matrix(.51751 0 0 .80957 -5445.68 638.025)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.94"
                                    d="M16637 1390h110"
                                    transform="matrix(.51751 0 0 .80957 -5445.68 656.074)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.94"
                                    d="M16637 1390h110"
                                    transform="matrix(.51751 0 0 .80957 -5445.68 674.808)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.94"
                                    d="M16637 1390h110"
                                    transform="matrix(.51751 0 0 .80957 -5445.68 643.813)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.94"
                                    d="M16637 1390h110"
                                    transform="matrix(.51751 0 0 .80957 -5445.68 661.862)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.94"
                                    d="M16637 1390h110"
                                    transform="matrix(.51751 0 0 .80957 -5445.68 680.596)"
                                  ></path>
                                  <path
                                    fill="#eca19a"
                                    d="M3270 3474c0-16.56-8.69-30-19.4-30h-141.2c-10.71 0-19.4 13.44-19.4 30 0 16.56 8.69 30 19.4 30h141.2c10.71 0 19.4-13.44 19.4-30z"
                                    transform="matrix(.698 0 0 .45134 956.743 169.149)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    d="M3225.36 3550.5c-8.43 1.96-3.82 15.61.35 19.66 6.22 6.03 18.45 8.64 26.82 6.83 5.51-1.19 10.29-5.03 8.61-11.19-1.17-4.28-4.03-7.94-6.64-11.42"
                                    transform="translate(245.992 -1561.34) scale(.92336)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.4"
                                    d="M2920 3494h-40c1.07 7.5 1.78 24.21 0 35h20l5 10 5-10h10c2.09-10.98 1.83-22.74 0-35z"
                                    transform="matrix(.87936 0 -.0977 .87936 929.25 -1410.86)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.12"
                                    d="M15739.5 990.429c7 1.038 14.3.248 21.4.334"
                                    transform="matrix(1.04218 -.02832 .0226 .83143 -13299.4 1297.18)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#f9e4e2"
                                    stroke-width="2.12"
                                    d="M15739.5 990.429c7 1.038 14.3.248 21.4.334"
                                    transform="matrix(1.04218 -.02832 .0226 .83143 -13299.5 1302.34)"
                                  ></path>
                                  <path
                                    fill="#f9e4e2"
                                    d="M2920 3494h-40c1.07 7.5 2.81 26.35 0 35h20l1.87 8.97 6.24-8.97H2920c2.09-10.98 1.83-22.74 0-35z"
                                    transform="matrix(1.09377 0 -.12153 1.09377 446.851 -2197.4)"
                                  ></path>
                                  <path
                                    fill="#fae5e3"
                                    stroke="#fff"
                                    stroke-width="2"
                                    d="M15739.5 990.429c7 1.038 14.3.248 21.4.334"
                                    transform="matrix(1.15099 -.0335 .02044 .83153 -14954.5 1343.6)"
                                  ></path>
                                  <path
                                    fill="#fae5e3"
                                    stroke="#fff"
                                    stroke-width="2"
                                    d="M15739.5 990.429c7 1.038 14.3.248 21.4.334"
                                    transform="matrix(1.15121 -.02171 .01005 .83178 -14947.4 1162.76)"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#da4c3f"
                                    stroke-width="1.999"
                                    d="M3249.306 1718.98c-8.661-11.289-12.756-20.208-22.586-18.293-3.706.718-6.89 2.948-10.004 4.973-5.797 3.754-9.87 6.637-16.072 9.785"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#da4c3f"
                                    stroke-width="1.999"
                                    d="M3220.052 1715.849c2.225-1.224 5.321-3.142 7.947-3.053 6.094.205 11.629 14.396 15.864 20.838"
                                  ></path>
                                  <g transform="matrix(.565 -.0122 -.0482 .53274 1787.66 -180.946)">
                                    <path
                                      fill="#fff"
                                      d="M2843.93 3578.3c-1.2-7.46-2.67-15.03-4.28-22.72l-93.39-1.58c1.74 34.73-11.28 61.21-6.26 100l24.83.29 5.79 24.06 14.67-22.24L2840 3654c4.69-17.12 6.24-32.97 6.26-51.88 0-2.25-1.59-19.16-2.33-23.82z"
                                    ></path>
                                    <clipPath id="_clip1">
                                      <path d="M2843.93 3578.3c-1.2-7.46-2.67-15.03-4.28-22.72l-93.39-1.58c1.74 34.73-11.28 61.21-6.26 100l24.83.29 5.79 24.06 14.67-22.24L2840 3654c4.69-17.12 6.24-32.97 6.26-51.88 0-2.25-1.59-19.16-2.33-23.82z"></path>
                                    </clipPath>
                                    <g clip-path="url(#_clip1)">
                                      <path
                                        fill="#f9e4e2"
                                        d="M2852.69 3588.68c25.27-2.68 21.57 23.92 53.25 25.92l-1.07 5.13-10.87 24.17c-11.89-1.5-22.65-2.15-22.65-2.15s-7.33-23.62-33.81-25.27l-10.53-10.13"
                                        transform="matrix(1.63217 -.2528 .4754 1.97699 -3615.82 -2818.34)"
                                      ></path>
                                    </g>
                                    <path
                                      fill="none"
                                      stroke="#eca19a"
                                      stroke-width="3.86"
                                      d="M2843.93 3578.3c-1.2-7.46-2.67-15.03-4.28-22.72l-93.39-1.58c1.74 34.73-11.28 61.21-6.26 100l24.83.29 5.79 24.06 14.67-22.24L2840 3654c4.69-17.12 6.24-32.97 6.26-51.88 0-2.25-1.59-19.16-2.33-23.82z"
                                    ></path>
                                  </g>
                                  <path
                                    fill="none"
                                    stroke="#da4c3f"
                                    stroke-width="3.86"
                                    d="M2738.85 3637.3c.05 5.34.4 10.88 1.15 16.7l24.83.29 5.79 24.06 14.67-22.24L2840 3654c4.69-17.12 6.24-32.97 6.26-51.88 0-.42-.06-1.36-.15-2.63"
                                    transform="matrix(.565 -.0122 -.0482 .53274 1787.66 -180.946)"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#e57f78"
                                    stroke-width="1.61"
                                    d="M15739.5 990.429c7 1.038 14.3.248 21.4.334"
                                    transform="matrix(1.4758 -.04136 .02793 .94664 -20079 1416.74)"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#e57f78"
                                    stroke-width="1.61"
                                    d="M15739.5 990.429c7 1.038 14.3.248 21.4.334"
                                    transform="matrix(1.4758 -.04136 .02793 .94664 -20079.1 1422.61)"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    stroke="#da4c3f"
                                    stroke-width="1.999"
                                    d="M3242.967 1732.167c-2.173 1.643-5.637 1.658-8.139 1.05-7.542-1.834-13.424-7.358-20.447-10.326-7.031-2.967-12.759-1.224-8.54 2.95 7.292 7.237 34.48 29.065 52.386 36.913 8.04 3.524 32.083 14.373 32.083 14.373"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#da4c3f"
                                    stroke-width="1.999"
                                    d="M3241.193 1729.055c.94 1.721 2.669 4.727 3.509 6.003M3241.09 1702.915c5.76-1.009 8.577 2.808 11.25 6.934 1.577 2.433 4.672 7.532 6.03 9.768M3251.222 1703.28c2.386.133 5.175 1.794 6.541 3.723.824 1.165 5.374 9.723 7.976 14.035M3261.261 1712.706c7.618-.876 12.828 14.52 16.513 21.272 6.878 12.597 15.062 19.207 28.054 22.313M3231.041 1714.449c-2.287 4.491-2.453 9.819-3.789 14.624"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#da4c3f"
                                    stroke-width="2.9"
                                    d="M2920.23 3609.25c-1.75 3.41-2.91 7.1-4.83 10.41"
                                    transform="matrix(.62629 -.10362 .12056 .72864 972.388 -606.689)"
                                  ></path>
                                  <circle
                                    cx="3025"
                                    cy="3579"
                                    r="15"
                                    fill="#fff"
                                    transform="matrix(.45134 0 0 .45134 1762.83 121.759)"
                                  ></circle>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <p className="text-center text-sm text-gray-600">
                        Keep all your high-level information organized here with{' '}
                        <br />
                        project comments.
                      </p>
                    </div>
                  ) : (
                    <div className="py-4">
                      {current_task_comments.map((commentItem, index) => (
                        <Comment key={index} comment={commentItem} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="">
                  <CommentEditor type={'task'} subject={task} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskModal;
