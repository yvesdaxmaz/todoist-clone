import React, { useState } from 'react';
import { Redirect, useRouteMatch, useHistory, Route } from 'react-router-dom';
import { GoComment } from 'react-icons/go';
import { BiUserPlus } from 'react-icons/bi';
import { IoIosRefresh } from 'react-icons/io';
import { BsCheck, BsArrowUpDown, BsThreeDots, BsPlus } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
import Task from './../Task/Task';
import ProjectCommentModal from './../ProjectCommentModal/ProjectCommentModal';
import ProjectTaskModal from './../ProjectTaskModal/ProjectTaskModal';
import TaskEditor from './../TaskEditor/TaskEditor';
import { useStateValue } from './../../StateProvider';
import ProjectOptions from './ProjectOptions';
import ProjectShareModal from './../ProjectShareModal/ProjectShareModal';
import { SHOW_PROJECT_SHARE_MODAL } from './../../actionTypes';

const Project = ({ project, tasks }) => {
  const [addTask, setAddTask] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const { url } = useRouteMatch();
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const handleCommentProject = () => {
    history.push(`${url}/comments`);
  };

  const handleAddTask = () => {
    setAddTask(true);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCancelAddTask = () => {
    setAddTask(false);
  };

  const handleAddTaskCompleted = () => {
    setAddTask(false);
  };

  const handleTaskDoubleClick = taskId => {
    history.push(`${url}/task/${taskId}`);
  };

  const handleShowCompletedTasks = () => {
    setShowCompletedTasks(true);
  };

  const handleHideCompletedTasks = () => {
    setShowCompletedTasks(false);
  };
  const handleDisplayShareModal = () => {
    dispatch({
      type: SHOW_PROJECT_SHARE_MODAL,
      project,
    });
  };

  const completed_tasks = tasks.filter(current_task => current_task.completed);
  const uncompleted_tasks = tasks.filter(
    current_task => !current_task.completed,
  );

  return (
    <div>
      <header className="pt-12 pb-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-800 text-xl">{project.name}</h2>
          <div className="relative flex items-center space-x-2">
            <Button
              texted
              bg="gray"
              bgOpacity="400"
              to={`${url}/comments`}
              optinText="Comments"
              classes={'text-white'}
              onClick={handleCommentProject}
            >
              <GoComment />
              <span className="text-sm">Comments</span>
            </Button>
            <Button
              texted
              bg="gray"
              bgOpacity="400"
              click={handleDisplayShareModal}
            >
              <BiUserPlus />
              <span className="text-sm">Share</span>
            </Button>
            <Button texted bg="gray" bgOpacity="400">
              <BsArrowUpDown />
              <span className="text-sm">Sort</span>
            </Button>
            <Button
              bg="gray"
              bgOpacity="400"
              classes={'text-white'}
              optinText="More project actions"
              click={handleShowMenu}
            >
              <BsThreeDots size="1.3em" />
            </Button>
            {showMenu ? (
              <ProjectOptions
                project={project}
                id={project.id}
                hide={() => setShowMenu(false)}
              />
            ) : null}
          </div>
        </div>
      </header>
      <section>
        <div className="">
          {uncompleted_tasks.map(current_task => {
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
        {!addTask ? (
          <div className="flex space-x-2 group py-2" onClick={handleAddTask}>
            <div className="flex items-center justify-center h-5 w-5 rounded-full group-hover:bg-red-500">
              <BsPlus
                size="1.2em"
                className="text-red-500 group-hover:text-white"
              />
            </div>

            <span className="text-sm text-gray-600 group-hover:text-red-500">
              Add task
            </span>
          </div>
        ) : (
          <div className="py-2">
            <TaskEditor
              cancelled={handleCancelAddTask}
              completed={handleAddTaskCompleted}
            />
          </div>
        )}

        {showCompletedTasks ? (
          <>
            <div className="">
              {completed_tasks.map(current_task => {
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
            {completed_tasks.length > 0 ? (
              <div className="border-y border-gray-200 py-2">
                <div className="flex items-center space-x-4">
                  <div className="relative flex items-center justify-center h-8 w-8">
                    <IoIosRefresh
                      size="1.5em"
                      className="text-gray-400 group-hover:text-gray-600"
                    />
                    <div className="absolute flex items-center justify-center h-full w-full top-0 left-0">
                      <BsCheck
                        size="0.8em"
                        className="text-gray-400  group-hover:text-gray-600"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{`+${completed_tasks.length} completed tasks`}</div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </section>

      <Route
        path="/app/project/:project_id/comments"
        render={routeParams => {
          return <ProjectCommentModal project={project} {...routeParams} />;
        }}
      />
      <Route
        path="/app/project/:project_id/task/:task_id"
        render={routeParams => {
          let task = state.tasks.find(current_task => {
            return (
              current_task.id === parseInt(routeParams.match.params.task_id)
            );
          });
          if (task) {
            return (
              <ProjectTaskModal
                project={project}
                task={task}
                {...routeParams}
              />
            );
          } else {
            return Redirect(url);
          }
        }}
      />

      {state.shared_project ? <ProjectShareModal project={project} /> : null}
    </div>
  );
};

export default Project;
