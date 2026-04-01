import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postLogout } from '../api';
import { useAuthContext } from '../../../../context/hooks/useAuthContext';
import { ROUTES } from '../../../../routes';

export function useLogout() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthContext();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('codename');
      clearAuth();
      navigate(ROUTES.LOGIN);
    },
  });
}
