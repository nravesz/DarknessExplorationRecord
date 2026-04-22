import { useEffect, useState } from 'react';
import { getAllRecords } from '../../ghost-story/api/ghostStory.service';
import type { IRecord } from '../../ghost-story/interfaces/IRecord';
import { useAuth } from '../../common/hooks/useAuth';

export function useMyRecords() {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { codename } = useAuth();

  useEffect(() => {
    getAllRecords()
      .then((all) => setRecords(all.filter((r) => r.user === codename)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [codename]);

  return { records, loading, error };
}
