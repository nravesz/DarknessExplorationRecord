import { useEffect, useState } from 'react';
import { getGhostStory } from '../api/ghostStory.service';
import type { IGhostStory } from '../interfaces/IGhostStory';

export function useGhostStory(ghostClass: string, id: string) {
  const [story, setStory] = useState<IGhostStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGhostStory(ghostClass, id)
      .then(setStory)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ghostClass, id]);

  return { story, loading, error };
}
