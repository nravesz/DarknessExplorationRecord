import { NavLink } from 'react-router-dom';
import './TabBar.css';

interface Tab {
  label: string;
  to: string;
}

function TabBar({ tabs }: { tabs: Tab[] }) {
  return (
    <div className='flex'>
      {tabs.map(({ label, to }) => (
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
