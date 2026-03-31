import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postLogout } from '../api';
import { ROUTES } from '../../../../routes';

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('codename');
      navigate(ROUTES.LOGIN);
    },
  });
}
