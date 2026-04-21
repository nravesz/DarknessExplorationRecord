import { useEffect, useState } from 'react';
import { getRecords } from '../../../api/ghostStory.service';
import type { IRecord } from '../interfaces/IRecord';

export function useRecords(ghostClass: string, storyId: string) {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getRecords(ghostClass, storyId)
      .then(setRecords)
      .catch((err) => setError(err?.message ?? 'Failed to load records'))
      .finally(() => setLoading(false));
  }, [ghostClass, storyId]);

  return { records, loading, error };
}
