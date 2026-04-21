import { useAuthContext } from '../../../context/hooks/useAuthContext';

export function useAuth() {
  return useAuthContext();
}
