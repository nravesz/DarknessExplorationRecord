import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from './register.hooks';
import type { IRegisterPayload } from './interfaces/register-payload.interface';
import { ROUTES } from '../../routes';

function Register() {
  const [form, setForm] = useState<IRegisterPayload>({
    email: '',
    password: '',
    name: '',
    codename: '',
  });

  const { mutate, isPending, error } = useRegister();

  const handleChange = (field: keyof IRegisterPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutate(form);
  };

  return (
    <div className="max-w-sm">
      <div className="border-l-4 border-brand pl-4 mb-8">
        <div className="text-xs uppercase tracking-widest text-brand mb-1">Daydream Inc.</div>
        <div className="text-4xl font-bold">Create Account</div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Name</div>
          <input
            type="text"
            className="bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Codename</div>
          <input
            type="text"
            className="bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="Your codename"
            value={form.codename}
            onChange={(e) => handleChange('codename', e.target.value)}
          />
        </div>

        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Email</div>
          <input
            type="email"
            className="bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Password</div>
          <input
            type="password"
            className="bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-error text-sm mb-4">Registration failed. Please try again.</p>}

      <div className="flex items-center gap-4">
        <button className="btn btn-primary" onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Account'}
        </button>
        <Link to={ROUTES.LOGIN} className="text-sm text-base-content/50 hover:text-base-content transition-colors">
          Already have an account
        </Link>
      </div>
    </div>
  );
}

export default Register;
