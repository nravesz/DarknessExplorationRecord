import { type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
	name: string;
  icon: LucideIcon;
  route: string;
}

function SideBarButton({ name, icon: Icon, route }: Props) {
  const navigate = useNavigate();

  return (
    <button className="w-4/5 mb-4 p-2 rounded hover:bg-base-300" onClick={() => navigate(route)}>
      <div className="flex flex-row">
        <Icon size={24} />
        <div>{name}</div>
      </div>
    </button>
  );
}

export default SideBarButton;
