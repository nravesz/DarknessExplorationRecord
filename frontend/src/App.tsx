import { Route, Routes } from 'react-router-dom';
import Layout from './features/Layout';
import LoginPage from './pages/Login';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
