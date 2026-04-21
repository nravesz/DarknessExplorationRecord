import type { IGhostStory } from "./interfaces/IGhostStory";

function Description({ story }: { story: IGhostStory }) {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-l-4 border-brand pl-4">
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Summary</div>
        <p className="text-base-content/80 leading-relaxed">{story.summary}</p>
      </div>

      <div className="border-l-4 border-brand pl-4">
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Medium to Enter</div>
        <p className="text-base-content/80 leading-relaxed">{story.mediumToEnter}</p>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-3">Description</div>
        <p className="text-base-content/70 leading-relaxed">{story.description}</p>
      </div>
    </div>
  );
}

export default Description;
