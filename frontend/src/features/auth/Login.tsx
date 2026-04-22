import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';
import type { ILoginPayload } from './interfaces/ILoginPayload';
import { ROUTES } from '../../routes';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const { mutate, isPending } = useLogin();

  const handleSubmit = () => {
    const payload: ILoginPayload = { email, password };
    mutate(payload, { onError: () => setHasError(true) });
  };

  return (
    <div className="max-w-sm">
      <div className="border-l-4 border-brand pl-4 mb-8">
        <div className="text-xs uppercase tracking-widest text-brand mb-1">Daydream Inc.</div>
        <div className="text-4xl font-bold">Login</div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Email</div>
          <input
            type="email"
            className="bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="Your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setHasError(false); }}
          />
        </div>

        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Password</div>
          <input
            type="password"
            className="bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setHasError(false); }}
          />
        </div>
      </div>

      {hasError && <p className="text-error text-sm mb-4">Invalid credentials. Please try again.</p>}

      <div className="flex items-center gap-4">
        <button className="btn btn-primary min-w-24" onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>
        <Link to={ROUTES.REGISTER} className="text-sm text-base-content/50 hover:text-base-content transition-colors">
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default Login;
