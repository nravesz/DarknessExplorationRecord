import { Home, User, Settings, LogIn, Ghost } from 'lucide-react';
import { ROUTES } from '../../../routes';
import { useAuth } from '../../../hooks/useAuth';
import SideBarButton from './SideBarButton';
import Logo from '../Logo';

function SideBar() {
  const { codename } = useAuth();

  return (
    <div className="flex flex-col bg-base-200 h-screen w-50 space-y-2 items-center py-4 shadow-lg">
      <div className="py-6">
        <Logo />
      </div>
      {codename && (
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Welcome</div>
          <div className="text-sm font-semibold">Agent {codename}</div>
        </div>
      )}
      <SideBarButton name={"Home"} icon={Home} route={ROUTES.HOME} />
      <SideBarButton name={"Ghost Stories"} icon={Ghost} route={ROUTES.GHOST_STORIES} />
      {/* <SideBarButton name={"User"} icon={User} route={ROUTES.USER} />
      <SideBarButton name={"Settings"} icon={Settings} route={ROUTES.SETTINGS} /> */}
      <SideBarButton name={"LogIn"} icon={LogIn} route={ROUTES.LOGIN} />
    </div>
  );
}

export default SideBar;
