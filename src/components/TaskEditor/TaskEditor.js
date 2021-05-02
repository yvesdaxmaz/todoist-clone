import React, { useState, useRef, useEffect } from 'react';
import { BsCalendar, BsInbox, BsFlag } from 'react-icons/bs';
import { AiOutlineTag } from 'react-icons/ai';
import { GiAlarmClock } from 'react-icons/gi';
import { IoMdPricetag } from 'react-icons/io';
import Button from './../../UI/Button/Button';
import ContentEditable from 'react-contenteditable';
import { useStateValue } from './../../StateProvider';
import {
  HIDE_QUICK_TASK_MODAL,
  ADD_TASK_TO_PROJECT,
  UPDATE_TASK_OF_PROJECT,
} from './../../actionTypes';
import NavItem from './../Sidebar/NavItem';
import { useHistory } from 'react-router-dom';

const TaskEditor = ({
  task,
  type,
  parent,
  cancelled,
  isQuickTask,
  completed,
}) => {
  const {
    location: { pathname },
  } = useHistory();
  const [displayProjectList, setDisplayProjectList] = useState(false);
  const [displayLabelsList, setDisplayLabelsList] = useState(false);
  let [projectFilter, setProjectListFilter] = useState('');
  const [editing, setEditing] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  let [attachedLabels, setAttachedLabels] = useState([]);
  const taskDescriptionRef = useRef('');
  const [{ labels, projects }, dispatch] = useStateValue();
  const wrapperRef = useRef(null);
  let [selectedProject, setSelectedProject] = useState(projects[0]);

  const displayProjectListRef = useRef(null);
  const displayLabelsListRef = useRef(null);
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if (isQuickTask) {
        dispatch({
          type: HIDE_QUICK_TASK_MODAL,
        });
      }
      setEditing(false);
      if (task) {
        setTaskDescription(task.description);
      } else {
        setTaskDescription('');
      }
    }

    if (
      displayProjectListRef.current &&
      !displayProjectListRef.current.contains(event.target)
    ) {
      setDisplayProjectList(false);
    }

    if (
      displayLabelsListRef.current &&
      !displayLabelsListRef.current.contains(event.target)
    ) {
      setDisplayLabelsList(false);
    }
  };

  const handleCancelAdd = () => {
    if (cancelled) {
      cancelled();
    }
    dispatch({
      type: HIDE_QUICK_TASK_MODAL,
    });
    if (task) {
      setTaskDescription(task.description);
    } else {
      setTaskDescription('');
    }

    setEditing(false);
  };

  const handleSaveTask = () => {
    if (!task) {
      if (type && parent) {
        dispatch({
          type: ADD_TASK_TO_PROJECT,
          task: {
            labels: attachedLabels,
            parent_id: parent.id,
            parent_type: type,
            project_id: selectedProject.id,
            description: taskDescription,
            created_at: new Date(),
          },
        });
      } else {
        dispatch({
          type: ADD_TASK_TO_PROJECT,
          task: {
            labels: attachedLabels,
            project_id: selectedProject.id,
            description: taskDescription,
            created_at: new Date(),
          },
        });
      }
    } else {
      if (
        task.description === taskDescription &&
        task.labels === attachedLabels &&
        task.project_id === selectedProject.id
      ) {
        completed();
        return false;
      }
      if (type && parent) {
        dispatch({
          type: UPDATE_TASK_OF_PROJECT,
          task: {
            ...task,
            description: taskDescription,
            labels: attachedLabels,
            parent_id: parent.id,
            project_id: selectedProject.id,
            updated_at: new Date(),
          },
        });
      } else {
        dispatch({
          type: UPDATE_TASK_OF_PROJECT,
          task: {
            ...task,
            description: taskDescription,
            labels: attachedLabels,
            project_id: selectedProject.id,
            updated_at: new Date(),
          },
        });
      }
    }

    if (completed) {
      completed();
    }

    if (isQuickTask) {
      dispatch({
        type: HIDE_QUICK_TASK_MODAL,
      });
    }
  };

  const handleAttachLabel = id => {
    let index = attachedLabels.findIndex(current => current === id);
    if (index === -1) {
      setAttachedLabels(attachedLabels.concat(id));
    } else {
      setAttachedLabels(
        attachedLabels.filter(item => {
          return item !== id;
        }),
      );
    }

    setDisplayLabelsList(false);
  };

  const handleChangeTaskDescription = event => {
    // taskDescriptionRef.current = event.target.value;
    setTaskDescription(event.target.value);
  };

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleDisplayProjectList = () => {
    setDisplayProjectList(true);
  };

  const handleDisplayLabelsList = () => {
    setDisplayLabelsList(true);
  };

  const handleChangeProjectListFilter = event => {
    setProjectListFilter(event.target.value);
  };

  const handleChangeSelectedProject = project => {
    setSelectedProject(project);
    setDisplayProjectList(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  });

  useEffect(() => {
    let pathRegex = /\/app\/project\/(\d+)/;
    let matches = pathname.match(pathRegex);
    let current_project = null;
    if (matches) {
      current_project = projects.find(
        project => project.id === parseInt(matches[1]),
      );
      setSelectedProject(current_project);
    }
    if (task) {
      setTaskDescription(task.description);
      setAttachedLabels(task.labels);
    }
  }, [projects, pathname, task]);

  let nonArchivedProjects = projects.filter(project => !project.archived);
  if (projectFilter !== '') {
    nonArchivedProjects = nonArchivedProjects.filter(project =>
      project.name.toLowerCase().includes(projectFilter),
    );
  }

  let attachedLabelsTags = attachedLabels.map(id => {
    let label = labels.find(currentLabel => currentLabel.id === id);
    return (
      <div
        className={`flex items-center space-x-1 py-1 px-1 text-sm text-white rounded ${label.bg.replace(
          'text',
          'bg',
        )}`}
        key={`${label.name}-${label.id}`}
      >
        <AiOutlineTag size="0.8em" />
        <span>{label.name}</span>
      </div>
    );
  });

  return (
    <div className="bg-white rounded-lg" ref={wrapperRef}>
      <div
        className={
          (editing ? 'border-gray-600' : 'border-gray-200') +
          ' border rounded p-2'
        }
      >
        <div className="relative py-2">
          {!editing &&
          (taskDescription === '' || taskDescription === '<br>') ? (
            <div
              className="w-full text-gray-300 text-sm"
              onClick={handleStartEditing}
            >
              e.g., Learn Portuguese every 2 days #Learning
            </div>
          ) : (
            <div className="w-full text-sm text-gray-600">
              <ContentEditable
                innerRef={taskDescriptionRef}
                html={taskDescription}
                disabled={false}
                onChange={handleChangeTaskDescription}
                tagName="div"
                className="w-full text-gray-600 break-all outline-none"
                onFocus={() => {
                  setEditing(true);
                }}
                onBlur={() => {
                  setEditing(false);
                }}
              />
            </div>
          )}

          {attachedLabelsTags.length > 0 ? (
            <div className="flex items-center space-x-1 mt-4">
              {attachedLabelsTags}
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button texted bg="gray" bgOpacity="300" bordered>
              <div className="text-green-500">
                <BsCalendar />
              </div>
              <span className="text-xs">Today</span>
            </Button>
            <Button
              texted
              bg="gray"
              bgOpacity="300"
              bordered
              click={handleDisplayProjectList}
            >
              <div className="">
                {selectedProject.name === 'Inbox' ? (
                  <BsInbox className="text-blue-600" />
                ) : (
                  <div
                    className={`h-2 w-2 rounded-full ${selectedProject.color}`}
                  ></div>
                )}
              </div>
              <span className="text-xs">{selectedProject.name}</span>
              {displayProjectList ? (
                <div
                  className="absolute z-50 top-0 left-0 mt-8 transform -translate-x-1/2 w-56 bg-white rounded shadow"
                  ref={displayProjectListRef}
                >
                  <div className="text-sm text-xs border-b border-gray-200 p-2">
                    <input
                      type="text"
                      value={projectFilter}
                      onChange={handleChangeProjectListFilter}
                      placeholder="Type a project"
                      className="w-full outline-none"
                    />
                  </div>
                  <div>
                    <nav>
                      {nonArchivedProjects.map(project => {
                        const { id, name, color } = project;
                        if (name === 'Inbox') {
                          return (
                            <NavItem
                              title={name}
                              key={id}
                              id={id}
                              checked={id === selectedProject.id}
                              click={() => {
                                handleChangeSelectedProject(project);
                              }}
                            >
                              <BsInbox className="text-blue-600" size="1.5em" />
                            </NavItem>
                          );
                        } else {
                          return (
                            <NavItem
                              title={name}
                              key={id}
                              id={id}
                              click={() => {
                                handleChangeSelectedProject(project);
                              }}
                              checked={id === selectedProject.id}
                            >
                              <div
                                className={`h-2 w-2 rounded-full ${color}`}
                              ></div>
                            </NavItem>
                          );
                        }
                      })}
                    </nav>
                  </div>
                </div>
              ) : null}
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              bg="gray"
              bgOpacity="300"
              optinText="Add label(s)"
              shortcutKey="@"
              classes={'text-white'}
              click={handleDisplayLabelsList}
            >
              <AiOutlineTag size="1.5em" />
              {displayLabelsList ? (
                <div
                  className="absolute z-50 top-0 left-0 mt-8 transform -translate-x-1/2 w-56 bg-white rounded shadow"
                  ref={displayLabelsListRef}
                >
                  <div>
                    <nav>
                      {labels.map(({ id, name, bg }) => (
                        <NavItem
                          title={name}
                          key={id}
                          click={() => {
                            handleAttachLabel(id);
                          }}
                        >
                          <IoMdPricetag size="1.5em" className={bg} />
                        </NavItem>
                      ))}
                    </nav>
                  </div>
                </div>
              ) : null}
            </Button>
            <Button
              bg="gray"
              bgOpacity="300"
              optinText="Set priority"
              shortcutKey="p1"
              classes={'text-white'}
            >
              <BsFlag size="1.5em" />
            </Button>
            <Button
              classes={'text-white'}
              bg="gray"
              bgOpacity="300"
              optinText="Add reminder(s)"
            >
              <GiAlarmClock size="1.5em" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mt-2">
        <button
          className={
            (taskDescription === '' || taskDescription === '<br>'
              ? 'bg-red-300 bg-opacity-75 '
              : 'bg-red-600 ') +
            'text-xs font-bold text-white border border-transparent rounded py-2 px-4'
          }
          onClick={handleSaveTask}
        >
          {task ? 'Save' : 'Add task'}
        </button>
        <button
          className="text-xs font-bold text-gray-800 bg-gray-200 border border-gray-300 rounded py-2 px-4"
          onClick={handleCancelAdd}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskEditor;
