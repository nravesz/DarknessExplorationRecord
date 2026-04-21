import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../api/auth.service';
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import { ROUTES } from '../../../routes';

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('codename', data.codename);
      localStorage.setItem('email', data.email);
      setAuth(data.codename, data.email);
      navigate(ROUTES.HOME);
    },
  });
}
