import { Outlet } from "react-router-dom";
import TabBar from "./TabBar";

function GhostStory() {
  return (
	<div>
		<div className="border-l-4 border-brand pl-4 mb-8">
			<div className="text-xs uppercase tracking-widest text-brand mb-1">Ghost Story</div>
			<div className="flex items-baseline justify-between">
				<h1 className="text-4xl font-bold">Tuesday Quiz Show</h1>
				<span className="font-mono text-sm text-base-content/40">Qterw-D-43</span>
			</div>
		</div>

		<TabBar />

		<div className="mt-10">
			<Outlet />
		</div>
	</div>
  );
}

export default GhostStory;