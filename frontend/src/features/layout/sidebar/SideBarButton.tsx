import { type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  icon: LucideIcon;
  route: string;
}

function SideBarButton({ icon: Icon, route }: Props) {
  const navigate = useNavigate();

  return (
    <button className="mb-4 p-2 rounded hover:bg-base-300" onClick={() => navigate(route)}>
      <Icon size={24} />
    </button>
  );
}

export default SideBarButton;