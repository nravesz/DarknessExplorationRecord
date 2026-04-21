import { Home, User, LogIn, LogOut, Ghost } from 'lucide-react';
import { ROUTES } from '../../../routes';
import { useAuth } from '../../common/hooks/useAuth';
import { useLogout } from '../../auth/logout/hooks/useLogout';
import SideBarButton from './SideBarButton';
import Logo from '../Logo';

function SideBar() {
  const { isLoggedIn, codename } = useAuth();
  const { mutate: logout } = useLogout();

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
      {isLoggedIn && <SideBarButton name={"Profile"} icon={User} route={ROUTES.USER} />}
      {isLoggedIn ? (
        <button
          onClick={() => logout()}
          className="w-4/5 pl-4 p-2 rounded transition flex items-center space-x-2 hover:bg-base-300"
        >
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      ) : (
        <SideBarButton name={"Login"} icon={LogIn} route={ROUTES.LOGIN} />
      )}
    </div>
  );
}

export default SideBar;
