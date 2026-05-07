import { useNavigate } from 'react-router-dom';
import { useRecentGhostStories } from '../features/ghost-stories/hooks/useRecentGhostStories';
import GhostStoryItem from '../features/ghost-stories/GhostStoryItem';
import { ghostStoryPath } from '../routes';

function Home() {
  const { stories, loading, error } = useRecentGhostStories();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className="text-6xl font-bold text-center">Darkness Exploration Records</h1>
      <p className="mt-4 text-center text-gray-500">A dashboard to register, monitor and manage any kind of ghost stories</p>

      <div className="w-full max-w-2xl mt-12">
        <h2 className="text-lg font-semibold mb-4">Recently Added</h2>
        {loading && <p className="text-base-content/60">Loading...</p>}
        {error && <p className="text-error">Error: {error}</p>}
        <div className="flex flex-col gap-2">
          {stories.map((story) => (
            <GhostStoryItem key={story.id} story={story} onClick={() => navigate(ghostStoryPath(story.id))} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
