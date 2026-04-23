import { useEffect, useState } from 'react';
import { getMyRecords } from '../../ghost-story/api/ghostStory.service';
import type { IRecord } from '../../ghost-story/interfaces/IRecord';

export function useMyRecords() {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyRecords()
      .then(setRecords)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { records, loading, error };
}
