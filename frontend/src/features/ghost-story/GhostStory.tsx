import { Outlet, useParams } from "react-router-dom";
import { useGhostStory } from './hooks/useGhostStory';
import TabBar from "../common/components/TabBar";
import { ROUTES } from "../../routes";

const TABS = [
  { label: 'Overview', to: ROUTES.GHOST_STORY_TABS.OVERVIEW },
  { label: 'Manual', to: ROUTES.GHOST_STORY_TABS.MANUAL },
  { label: 'Records', to: ROUTES.GHOST_STORY_TABS.RECORDS },
];

function GhostStory() {
  const { id } = useParams() as { id: string };
  const parts = id.split('-');
  const ghostClass = parts[parts.length - 2];
  const storyId = parts[parts.length - 1];
  const { story, loading, error } = useGhostStory(ghostClass, storyId);

  if (loading) return <p className="text-base-content/60">Loading...</p>;
  if (error) return <p className="text-error">Error: {error}</p>;

  return (
	<div>
		<div className="border-l-4 border-brand pl-4 mb-8">
			<div className="text-xs uppercase tracking-widest text-brand mb-1">Ghost Story</div>
			<div className="flex items-baseline justify-between">
				<h1 className="text-4xl font-bold">{story?.name}</h1>
				<span className="font-mono text-sm text-base-content/40">{story?.id}</span>
			</div>
		</div>

		<TabBar tabs={TABS} />

		<div className="mt-10">
			<Outlet context={story} />
		</div>
	</div>
  );
}

export default GhostStory;