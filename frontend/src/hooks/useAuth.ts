export function useAuth() {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const codename = localStorage.getItem('codename');
  return { isLoggedIn, codename };
}
