import { useEffect, useState } from 'react';
import { getGhostStories } from '../api/ghostStory.service';
import type { IGhostStory } from '../../common/interfaces/IGhostStory';

export function useGhostStories() {
  const [stories, setStories] = useState<IGhostStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGhostStories()
      .then(setStories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stories, loading, error };
}
