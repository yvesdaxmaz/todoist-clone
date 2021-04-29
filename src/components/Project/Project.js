import React from 'react';
import { withRouter } from 'react-router-dom';
import { GoComment } from 'react-icons/go';
import { BiUserPlus } from 'react-icons/bi';
import { BsArrowUpDown, BsThreeDots } from 'react-icons/bs';
import Button from './../../UI/Button/Button';
import Task from './../Task/Task';
const Project = ({ project, tasks }) => {
  return (
    <div>
      <header className="pt-12 pb-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-800 text-xl">{project.name}</h2>
          <div className="flex items-center space-x-2">
            <Button texted bg="gray" bgOpacity="400">
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
            <Button bg="gray" bgOpacity="400">
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
      </section>
    </div>
  );
};

export default withRouter(Project);
