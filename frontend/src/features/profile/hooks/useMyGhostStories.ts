import { useEffect, useState } from 'react';
import { getMyGhostStories } from '../../ghost-stories/api/ghostStory.service';
import type { IGhostStory } from '../../ghost-story/interfaces/IGhostStory';

export function useMyGhostStories() {
  const [stories, setStories] = useState<IGhostStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyGhostStories()
      .then(setStories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stories, loading, error };
}
