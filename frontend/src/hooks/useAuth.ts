export function useAuth() {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  return { isLoggedIn };
}
