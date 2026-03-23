import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './features/Layout';
import FileSummary from './features/ghost-story/FileSummary';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { ROUTES } from './routes';

const { OVERVIEW, DESCRIPTION, MANUAL, RECORDS } = ROUTES.GHOST_STORY_TABS;

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />}>
          <Route index element={<Navigate to={OVERVIEW} replace />} />
          <Route path={OVERVIEW} element={<FileSummary />} />
          <Route path={DESCRIPTION} element={<div>Description</div>} />
          <Route path={MANUAL} element={<div>Procedure Manual</div>} />
          <Route path={RECORDS} element={<div>Darkness Exploration Records</div>} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
