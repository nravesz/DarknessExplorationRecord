import type { IGhostStory } from "../../interfaces/IGhostStory";

function FileSummary({ story }: { story: IGhostStory }) {
  return (
    <div className="max-w-lg border-l-4 border-brand bg-base-200 px-5 py-4">
      <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Ghost Story ID</div>
      <div className="text-2xl font-bold mb-4">{story.id}</div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-base-content/60 uppercase tracking-wide">Darkness Class</span>
          <span className="text-sm font-bold text-brand">{story.class}</span>
        </div>

        <div className="border-t border-base-content/10"></div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-base-content/60 uppercase tracking-wide">Procedure Manual</span>
          <span className={`text-sm font-semibold ${story.manual ? 'text-success' : 'text-base-content/40'}`}>
            {story.manual ? 'Yes' : 'No'}
          </span>
        </div>


      </div>
    </div>
  );
}

export default FileSummary;
