import React from 'react';
import { BsInbox, BsCalendar } from 'react-icons/bs';
import NavItem from './NavItem';
import NavDropdownItem from './NavDropdownItem';

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
      <NavDropdownItem title="Projects"></NavDropdownItem>
    </nav>
  );
};

export default Nav;
