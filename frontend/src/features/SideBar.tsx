import { Home, User, Settings, LogIn } from 'lucide-react';

function SideBar() {
  return (
    <div className="flex flex-col bg-base-200 h-screen w-16 items-center py-4 shadow-lg fixed">
      <button className="mb-4 p-2 rounded hover:bg-base-300">
        <Home size={24} />
      </button>
      <button className="mb-4 p-2 rounded hover:bg-base-300">
        <User size={24} />
      </button>
      <button className="mb-4 p-2 rounded hover:bg-base-300">
        <Settings size={24} />
      </button>
      <button className="mb-4 p-2 rounded hover:bg-base-300">
        <LogIn size={24} />
      </button>
    </div>
  );
}

export default SideBar;
