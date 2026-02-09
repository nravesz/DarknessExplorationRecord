import { postLogin } from './login.api';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  return useMutation({
    mutationFn:postLogin,
    onSuccess: (data) =>
    {
      console.log(data);
    }
  })
}
