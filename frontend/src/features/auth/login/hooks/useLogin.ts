import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../api';

export function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
    },
  });
}
