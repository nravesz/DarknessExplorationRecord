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

	</div>);
}

export default GhostStory;