import { Route, Routes } from 'react-router-dom';
import Layout from './features/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import { ROUTES } from './routes';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
