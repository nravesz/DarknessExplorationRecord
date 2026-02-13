import { Outlet } from 'react-router-dom';
import SideBar from './layout/sidebar/SideBar';

function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6 pt-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
