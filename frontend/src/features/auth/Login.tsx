import { useState } from 'react';
import { useLogin } from './login.hooks';
import Button from '../common/Button';
import type { ILoginPayload } from './interfaces/login-payload.interface';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending, error } = useLogin();

  const handleClick = () => {
    const payload: ILoginPayload = { email, password };
    mutate(payload);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Email"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button label={isPending ? 'Logging in...' : 'Login'} onClick={handleClick} />
    </>
  );
}

export default Login;
