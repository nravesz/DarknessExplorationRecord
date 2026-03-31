import type { IAuthState } from './IAuthState';

export interface IAuthContextValue extends IAuthState {
  setAuth: (codename: string) => void;
  clearAuth: () => void;
}
