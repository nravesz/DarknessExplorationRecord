import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../api';
import { useAuthContext } from '../../../../context/hooks/useAuthContext';
import { ROUTES } from '../../../../routes';

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('codename', data.codename);
      setAuth(data.codename);
      navigate(ROUTES.HOME);
    },
  });
}
