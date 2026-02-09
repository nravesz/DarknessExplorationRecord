import { Home, User, Settings, LogIn } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-base-200 h-screen w-16 items-center py-4 shadow-lg">
      <button className="mb-4 p-2 rounded hover:bg-base-300" onClick={() => navigate(ROUTES.HOME)}>
        <Home size={24} />
      </button>
      <button className="mb-4 p-2 rounded hover:bg-base-300">
        <User size={24} />
      </button>
      <button className="mb-4 p-2 rounded hover:bg-base-300">
        <Settings size={24} />
      </button>
      <button onClick={() => navigate(ROUTES.LOGIN)} className="mb-4 p-2 rounded hover:bg-base-300">
        <LogIn size={24} />
      </button>
    </div>
  );
}

export default SideBar;
