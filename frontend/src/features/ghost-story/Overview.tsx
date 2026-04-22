import { useOutletContext } from "react-router-dom";
import type { IGhostStory } from "../common/interfaces/IGhostStory";
import Description from "./Description";
import FileSummary from "./FileSummary";

function Overview() {
  const story = useOutletContext<IGhostStory>();

  return (
    <div className="space-y-8">
      <FileSummary story={story} />
      <Description story={story} />
    </div>
  );
}

export default Overview;
