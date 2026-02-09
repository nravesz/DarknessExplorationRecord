import { useEffect, useState } from 'react';
import type { ILogin } from './interfaces/login.interface';
import { getLogin } from './login.api';

export function useLogin() {
  const [data, setData] = useState<ILogin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLogin()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
