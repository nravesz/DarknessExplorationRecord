import { type LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  name: string;
  icon: LucideIcon;
  route: string;
}

function SideBarButton({ name, icon: Icon, route }: Props) {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `w-4/5 pl-4 p-2 rounded transition 
        flex items-center space-x-2
        ${isActive ? 'bg-base-300' : 'hover:bg-base-300'}`
      }
    >
      <Icon size={24} />
      <span>{name}</span>
    </NavLink>
  );
}

export default SideBarButton;
