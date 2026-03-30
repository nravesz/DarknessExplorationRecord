import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useGhostStories } from '../../hooks/useGhostStory';
import type { IGhostStory } from '../../interfaces/IGhostStory';
import { ghostStoryPath, ROUTES } from '../../routes';

const PAGE_SIZE = 10;

function GhostStoryItem({ story, onClick }: { story: IGhostStory; onClick: () => void }) {
  return (
    <div
      className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer transition"
      onClick={onClick}
    >
      <div>
        <p className="font-medium">{story.name}</p>
        <p className="text-sm text-base-content/60">{story.id}</p>
      </div>
      <span className="badge badge-outline">Class {story.class}</span>
    </div>
  );
}

function Pagination({ page, totalPages, onPrev, onNext }: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-2">
      <button className="btn btn-sm" onClick={onPrev} disabled={page === 0}>Previous</button>
      <span className="text-sm text-base-content/60">{page + 1} / {totalPages}</span>
      <button className="btn btn-sm" onClick={onNext} disabled={page === totalPages - 1}>Next</button>
    </div>
  );
}

function GhostStoryList() {
  const { stories, loading, error } = useGhostStories();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  function handleCreate() {
    if (!isLoggedIn) {
      console.log("You're not logged");
      return;
    }
    navigate(ROUTES.CREATE_GHOST_STORY);
  }

  if (loading) return <p className="text-base-content/60">Loading...</p>;
  if (error) return <p className="text-error">Error: {error}</p>;

  const totalPages = Math.ceil(stories.length / PAGE_SIZE);
  const paginated = stories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ghost Stories</h1>
        <button className="btn btn-sm btn-outline" onClick={handleCreate}>+ New Ghost Story</button>
      </div>
      <div className="flex flex-col gap-2">
        {paginated.map((story: IGhostStory) => (
          <GhostStoryItem key={story.id} story={story} onClick={() => navigate(ghostStoryPath(story.id))} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}

export default GhostStoryList;
