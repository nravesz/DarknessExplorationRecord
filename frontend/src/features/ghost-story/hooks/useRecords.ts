import { useCallback, useEffect, useState } from 'react';
import { getRecords } from '../../../api/ghostStory.service';
import type { IRecord } from '../interfaces/IRecord';

export function useRecords(ghostClass: string, storyId: string) {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(null);
    getRecords(ghostClass, storyId)
      .then(setRecords)
      .catch((err) => setError(err?.message ?? 'Failed to load records'))
      .finally(() => setLoading(false));
  }, [ghostClass, storyId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { records, loading, error, refetch: fetch };
}
