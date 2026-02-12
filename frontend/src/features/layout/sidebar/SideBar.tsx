import { Home, User, Settings, LogIn } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import SideBarButton from './SideBarButton';

function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-base-200 h-screen w-16 items-center py-4 shadow-lg">
      <SideBarButton icon={Home} route={ROUTES.HOME} />
      <SideBarButton icon={User} route={ROUTES.HOME} />
      <SideBarButton icon={Settings} route={ROUTES.HOME} />
      <SideBarButton icon={LogIn} route={ROUTES.LOGIN} />
    </div>
  );
}

export default SideBar;
