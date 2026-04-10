import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './features/Layout';
import Description from './features/ghost-story/Description';
import GhostStory from './features/ghost-story/GhostStory';
import Overview from './features/ghost-story/Overview';
import CreateGhostStoryPage from './pages/CreateGhostStoryPage';
import GhostStoriesPage from './pages/GhostStoriesPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import { ROUTES } from './routes';

const { OVERVIEW, DESCRIPTION, MANUAL, RECORDS } = ROUTES.GHOST_STORY_TABS;

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GHOST_STORIES} element={<GhostStoriesPage />} />
        <Route path={ROUTES.CREATE_GHOST_STORY} element={<CreateGhostStoryPage />} />
        <Route path={ROUTES.GHOST_STORY} element={<GhostStory />}>
          <Route index element={<Navigate to={OVERVIEW} replace />} />
          <Route path={OVERVIEW} element={<Overview />} />
          <Route path={DESCRIPTION} element={<Description />} />
          <Route path={MANUAL} element={<div>Procedure Manual</div>} />
          <Route path={RECORDS} element={<div>Darkness Exploration Records</div>} />
        </Route>
        <Route path={ROUTES.USER} element={<ProfilePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
