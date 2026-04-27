import type { IAuthState } from './IAuthState';

export interface IAuthContextValue extends IAuthState {
  setAuth: (codename: string, email: string, role: string) => void;
  clearAuth: () => void;
}
