import { useEffect, useState } from 'react';
import { getGhostStories, getMyGhostStories } from '../features/ghost-stories/api/ghostStory.service';
import { getGhostStory } from '../features/ghost-story/api/ghostStory.service';
import type { IGhostStory } from '../interfaces/IGhostStory';

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

export function useGhostStory(ghostClass: string, id: string) {
  const [story, setStory] = useState<IGhostStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(ghostClass, id);
  useEffect(() => {
    getGhostStory(ghostClass, id)
      .then(setStory)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ghostClass, id]);

  return { story, loading, error };
}
