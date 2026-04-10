import type { IAuthState } from './IAuthState';

export interface IAuthContextValue extends IAuthState {
  setAuth: (codename: string, email: string) => void;
  clearAuth: () => void;
}
