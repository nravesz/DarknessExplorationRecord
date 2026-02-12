import { Home, User, Settings, LogIn } from 'lucide-react';
import { ROUTES } from '../../../routes';
import SideBarButton from './SideBarButton';

function SideBar() {
  return (
    <div className="flex flex-col bg-base-200 h-screen w-50 space-y-2 items-center py-4 shadow-lg">
      <SideBarButton name={"Home"} icon={Home} route={ROUTES.HOME} />
      {/* <SideBarButton name={"User"} icon={User} route={ROUTES.USER} />
      <SideBarButton name={"Settings"} icon={Settings} route={ROUTES.SETTINGS} /> */}
      <SideBarButton name={"LogIn"} icon={LogIn} route={ROUTES.LOGIN} />
      </div>
  );
}

export default SideBar;
