import React, { useState } from 'react';
import { useRouteMatch, useHistory, Route } from 'react-router-dom';
import { GoComment } from 'react-icons/go';
import { BiUserPlus } from 'react-icons/bi';
import { BsArrowUpDown, BsThreeDots, BsPlus } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
import Task from './../Task/Task';
import ProjectCommentModal from './../ProjectCommentModal/ProjectCommentModal';
import TaskEditor from './../TaskEditor/TaskEditor';

const Project = ({ project, tasks }) => {
  const [addProject, setAddProject] = useState(false);
  const { url } = useRouteMatch();
  const history = useHistory();
  const handleCommentProject = () => {
    history.push(`${url}/comments`);
  };

  const handleAddProject = () => {
    setAddProject(true);
  };

  const handleCancelAddProject = () => {
    setAddProject(false);
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
              />
            );
          })}
        </div>
        {!addProject ? (
          <div className="flex space-x-2 group py-2" onClick={handleAddProject}>
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
            <TaskEditor cancel={handleCancelAddProject} />
          </div>
        )}
      </section>

      <Route
        path="/app/project/:project_id/comments"
        render={routeParams => {
          return <ProjectCommentModal project={project} {...routeParams} />;
        }}
      />
    </div>
  );
};

export default Project;
