import React from 'react';
import { BsInbox, BsCalendar } from 'react-icons/bs';
import { GiWaterDrop } from 'react-icons/gi';
import NavItem from './NavItem';
import NavSection from './NavSection';
import NavToggleItem from './NavToggleItem';

const Nav = props => {
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
          console.log('add projects');
        }}
      >
        <NavItem title="Welcome  👋" optionable draggable>
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
        </NavItem>

        <NavItem title="Learning" optionable draggable>
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
        </NavItem>

        <NavToggleItem offTitle="Archived projects" onTitle="Hide Archived">
          <NavItem title="Learning" optionable>
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          </NavItem>
        </NavToggleItem>
      </NavSection>

      <NavSection
        title="Labels"
        add={e => {
          e.preventDefault();
          console.log('add projects');
        }}
      ></NavSection>
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
