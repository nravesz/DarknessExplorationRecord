import { Route, Routes } from 'react-router-dom';
import Layout from './features/Layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { ROUTES } from './routes';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
