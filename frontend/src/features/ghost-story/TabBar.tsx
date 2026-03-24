import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';
import './TabBar.css';

const TABS = [
  { label: 'Overview', to: ROUTES.GHOST_STORY_TABS.OVERVIEW },
{ label: 'Manual', to: ROUTES.GHOST_STORY_TABS.MANUAL },
  { label: 'Records', to: ROUTES.GHOST_STORY_TABS.RECORDS },
];

function TabBar() {
  return (
    <div className='flex'>
      {TABS.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `slanted-btn ${isActive ? 'active' : ''}`}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}

export default TabBar;
