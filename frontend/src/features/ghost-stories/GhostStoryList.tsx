import { useState } from 'react';
import { useGhostStories } from '../../hooks/useGhostStory';
import type { IGhostStory } from '../../interfaces/IGhostStory';

const PAGE_SIZE = 10;

function GhostStoryList() {
  const { stories, loading, error } = useGhostStories();
  const [page, setPage] = useState(0);

  if (loading) return <p className="text-base-content/60">Loading...</p>;
  if (error) return <p className="text-error">Error: {error}</p>;

  const totalPages = Math.ceil(stories.length / PAGE_SIZE);
  const paginated = stories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Ghost Stories</h1>

      <div className="flex flex-col gap-2">
        {paginated.map((story: IGhostStory) => (
          <div
            key={story.id}
            className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer transition"
          >
            <div>
              <p className="font-medium">{story.name}</p>
              <p className="text-sm text-base-content/60">{story.id}</p>
            </div>
            <span className="badge badge-outline">Class {story.class}</span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <span className="text-sm text-base-content/60">
            {page + 1} / {totalPages}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default GhostStoryList;
