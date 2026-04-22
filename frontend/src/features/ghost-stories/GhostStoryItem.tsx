import type { IGhostStory } from '../common/interfaces/IGhostStory';

function GhostStoryItem({ story, onClick }: { story: IGhostStory; onClick: () => void }) {
  return (
    <div
      className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer transition"
      onClick={onClick}
    >
      <div>
        <p className="font-medium">{story.name}</p>
        <p className="text-sm text-base-content/60">{story.id}</p>
      </div>
      <span className="badge badge-outline">Class {story.class}</span>
    </div>
  );
}

export default GhostStoryItem;
