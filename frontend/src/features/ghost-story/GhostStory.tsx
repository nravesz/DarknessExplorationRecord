import FileSummary from "./FileSummary";
import TabBar from "./TabBar";

function GhostStory() {
  return (
	<div>
		<div className="flex justify-between">
			<h1 className="text-4xl font-bold">Tuesday Quiz Show</h1>
			<h1 className="text-4xl font-bold">Qterw-D-43</h1>
		</div>

		<div>Overview Description Manual Records</div>

		<div className="divider"></div>

		<TabBar />

		<FileSummary />

		<div className="divider"></div>

		<div>Description</div>

		<div>Procedure Manual </div>

		<div>Darkness Exploration Records</div>
	</div>);
}

export default GhostStory;