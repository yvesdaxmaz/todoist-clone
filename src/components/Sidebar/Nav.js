import React from 'react';
import { BsInbox, BsCalendar } from 'react-icons/bs';
import { GiWaterDrop } from 'react-icons/gi';
import { IoMdPricetag } from 'react-icons/io';
import NavItem from './NavItem';
import NavSection from './NavSection';
import NavToggleItem from './NavToggleItem';
import { useStateValue } from './../../StateProvider';
import { SHOW_ADD_PROJECT_MODAL } from './../../actionTypes';

const Nav = props => {
  const [{ addProject, labels, projects }, dispatch] = useStateValue();

  const handleAddProject = () => {
    dispatch({
      type: SHOW_ADD_PROJECT_MODAL,
    });
  };

  let archivedProjects = projects.filter(project => project.archived);
  let nonArchivedProjects = projects.filter(project => !project.archived);

  return (
    <nav>
      <NavItem title="Inbox" counter={3}>
        <BsInbox className="text-blue-600" size="1.5em" />
      </NavItem>
      <NavItem title="Today" counter={2} isActive={true}>
        <BsCalendar className="text-green-600" size="1.5em" />
      </NavItem>
      <NavItem title="Upcoming">
        <BsCalendar className="text-purple-600" size="1.5em" />
      </NavItem>

      <NavSection
        title="Projects"
        add={e => {
          e.preventDefault();

          handleAddProject();
          console.log('add projects');
        }}
      >
        {nonArchivedProjects.map(({ id, name, color, archived }) => {
          return (
            <NavItem
              title={name}
              key={id}
              optionable
              draggable
              archived={archived}
              id={id}
            >
              <div className={`h-2 w-2 rounded-full ${color}`}></div>
            </NavItem>
          );
        })}

        <NavToggleItem offTitle="Archived projects" onTitle="Hide Archived">
          {archivedProjects.map(({ id, name, color, archived }) => {
            return (
              <NavItem
                title={name}
                key={id}
                optionable
                archived={archived}
                id={id}
              >
                <div
                  className={`h-2 w-2 rounded-full ${color}`}
                  archived={archived}
                ></div>
              </NavItem>
            );
          })}
        </NavToggleItem>
      </NavSection>

      <NavSection
        title="Labels"
        add={e => {
          e.preventDefault();
          console.log('add projects');
        }}
      >
        {labels.map(({ id, name, counter, bg, archived }) => {
          return (
            <NavItem title={name} key={id} tighten counter={counter}>
              <IoMdPricetag size="1.5em" className={bg} />
            </NavItem>
          );
        })}
      </NavSection>
      <NavSection title="Filters">
        <NavItem title="Assigned to me" optionable>
          <GiWaterDrop className="text-gray-600" size="1.5em" />
        </NavItem>
        <NavItem title="Assigned to others" optionable>
          <GiWaterDrop className="text-gray-600" size="1.5em" />
        </NavItem>
        <NavItem title="Priority 1" optionable>
          <GiWaterDrop className="text-blue-600" size="1.5em" />
        </NavItem>
        <NavItem title="Priority 2" optionable>
          <GiWaterDrop className="text-blue-600" size="1.5em" />
        </NavItem>
        <NavItem title="Priority 3" optionable>
          <GiWaterDrop className="text-blue-600" size="1.5em" />
        </NavItem>
        <NavItem title="Priority 4" optionable>
          <GiWaterDrop className="text-blue-600" size="1.5em" />
        </NavItem>
        <NavItem title="Priority 5" optionable>
          <GiWaterDrop className="text-blue-600" size="1.5em" />
        </NavItem>
        <NavItem title="View all" optionable>
          <GiWaterDrop className="text-blue-600" size="1.5em" />
        </NavItem>
        <NavItem title="No due date" optionable>
          <GiWaterDrop className="text-blue-600" size="1.5em" />
        </NavItem>
      </NavSection>
    </nav>
  );
};

export default Nav;
