import { Outlet } from 'react-router-dom';
import { useAuth } from '../common/hooks/useAuth';
import TabBar from '../common/components/TabBar';
import { ROUTES } from '../../routes';

const TABS = [
  { label: 'Ghost Stories', to: ROUTES.PROFILE_TABS.GHOST_STORIES },
  { label: 'Records', to: ROUTES.PROFILE_TABS.RECORDS },
];

function Profile() {
  const { email, codename, role } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="flex flex-col gap-2 bg-base-200 rounded-lg p-4 w-fit">
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/60 uppercase tracking-wide">Agent</span>
          <span className="text-sm font-semibold capitalize">{codename}</span>
        </div>
        <div className="border-t border-base-content/10"></div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/60 uppercase tracking-wide">Email</span>
          <span className="text-sm">{email}</span>
        </div>
        <div className="border-t border-base-content/10"></div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/60 uppercase tracking-wide">Role</span>
          <span className="text-sm">{role === 'demo_user' ? 'Demo User' : 'Admin'}</span>
        </div>
      </div>
      <TabBar tabs={TABS} />
      <Outlet />
    </div>
  );
}

export default Profile;
