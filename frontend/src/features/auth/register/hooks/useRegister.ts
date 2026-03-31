import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../api';
import { ROUTES } from '../../../../routes';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });
}
