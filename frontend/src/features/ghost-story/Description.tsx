import { useOutletContext } from "react-router-dom";
import type { IGhostStory } from "../common/interfaces/IGhostStory";

function Description({ story: storyProp }: { story?: IGhostStory }) {
  const outletStory = useOutletContext<IGhostStory | undefined>();
  const story = storyProp ?? outletStory;

  if (!story) return null;

  return (
    <div className="max-w-2xl space-y-6">
      {story.summary && (
        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Summary</div>
          <div className="space-y-2">
            {story.summary.split('\n').map((p, i) => (
              <p key={i} className="text-base-content/80 leading-relaxed whitespace-pre-line">{p}</p>
            ))}
          </div>
        </div>
      )}

      {story.mediumToEnter && (
        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Medium to Enter</div>
          <div className="space-y-2">
            {story.mediumToEnter.split('\n').map((p, i) => (
              <p key={i} className="text-base-content/80 leading-relaxed whitespace-pre-line">{p}</p>
            ))}
          </div>
        </div>
      )}

      {story.description && (
        <div>
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-3">Description</div>
          <div className="space-y-2">
            {story.description.split('\n').map((p, i) => (
              <p key={i} className="text-base-content/70 leading-relaxed whitespace-pre-line">{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Description;
