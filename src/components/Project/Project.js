import React, { useState } from 'react';
import { Redirect, useRouteMatch, useHistory, Route } from 'react-router-dom';
import { GoComment } from 'react-icons/go';
import { BiUserPlus } from 'react-icons/bi';
import { BsArrowUpDown, BsThreeDots, BsPlus } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
import Task from './../Task/Task';
import ProjectCommentModal from './../ProjectCommentModal/ProjectCommentModal';
import ProjectTaskModal from './../ProjectTaskModal/ProjectTaskModal';
import TaskEditor from './../TaskEditor/TaskEditor';
import { useStateValue } from './../../StateProvider';

const Project = ({ project, tasks }) => {
  const [addTask, setAddTask] = useState(false);
  const { url } = useRouteMatch();
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const handleCommentProject = () => {
    history.push(`${url}/comments`);
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

  const handleTaskDoubleClick = taskId => {
    history.push(`${url}/task/${taskId}`);
  };

  return (
    <div>
      <header className="pt-12 pb-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-800 text-xl">{project.name}</h2>
          <div className="flex items-center space-x-2">
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
            <Button texted bg="gray" bgOpacity="400">
              <BiUserPlus />
              <span className="text-sm">Share</span>
            </Button>
            <Button texted bg="gray" bgOpacity="400">
              <BsArrowUpDown />
              <span className="text-sm">Share</span>
            </Button>
            <Button
              bg="gray"
              bgOpacity="400"
              classes={'text-white'}
              optinText="More project actions"
            >
              <BsThreeDots size="1.3em" />
            </Button>
          </div>
        </div>
      </header>
      <section>
        <div className="">
          {tasks.map(current_task => {
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
    </div>
  );
};

export default Project;
