import Button from '../common/Button';
import type { ILoginPayload } from './interfaces/login-payload.interface';
import { useLogin } from './login.hooks';

const LoginButtonContainer = () => {
  const { mutate, isPending, error } = useLogin();
  const payload: ILoginPayload = {
    "email": "agente.carpincho@gmail.com",
    "password": "123556"
  }

  const handleClick = () => {
    mutate(payload);
  };

  return <Button label={isPending ? 'Logging in...' : 'Login'} onClick={handleClick} />;
};

export default LoginButtonContainer;
