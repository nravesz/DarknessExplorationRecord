import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyGhostStories } from './hooks/useMyGhostStories';
import type { IGhostStory } from '../common/interfaces/IGhostStory';
import { ghostStoryPath } from '../../routes';
import GhostStoryItem from '../ghost-stories/GhostStoryItem';
import Pagination from '../ghost-stories/Pagination';

const PAGE_SIZE = 10;

function ProfileStoryList() {
  const { stories, loading, error } = useMyGhostStories();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  if (loading) return <p className="text-base-content/60">Loading...</p>;
  if (error) return <p className="text-error">Error: {error}</p>;
  if (stories.length === 0) return <p className="text-base-content/60">No stories registered yet.</p>;

  const totalPages = Math.ceil(stories.length / PAGE_SIZE);
  const paginated = stories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-2">
      {paginated.map((story: IGhostStory) => (
        <GhostStoryItem key={story.id} story={story} onClick={() => navigate(ghostStoryPath(story.id))} />
      ))}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}

export default ProfileStoryList;
