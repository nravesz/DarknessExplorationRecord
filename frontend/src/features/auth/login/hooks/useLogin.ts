import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../api';
import { useAuthContext } from '../../../../context/hooks/useAuthContext';

export function useLogin() {
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('codename', data.codename);
      setAuth(data.codename);
    },
  });
}
