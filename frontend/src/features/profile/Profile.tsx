import { useAuth } from '../common/hooks/useAuth';
import ProfileStoryList from './ProfileStoryList';

function Profile() {
  const { email, codename } = useAuth();

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
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">My Stories</h2>
        <ProfileStoryList />
      </div>
    </div>
  );
}

export default Profile;
