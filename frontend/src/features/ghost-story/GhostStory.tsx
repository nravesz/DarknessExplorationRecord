import FileSummary from "./FileSummary";

function GhostStory() {
  return (
	<div>
		<div className="flex justify-between">
			<h1 className="text-4xl font-bold">Tuesday Quiz Show</h1>
			<h1 className="text-4xl font-bold">Qterw-D-43</h1>
		</div>

		<div className="divider"></div>

		<FileSummary />

		<div className="divider"></div>

		<div>Description</div>

		<div>Manual to deal with this story</div>

		<div>Darkness Exploration Records</div>
	</div>);
}

export default GhostStory;