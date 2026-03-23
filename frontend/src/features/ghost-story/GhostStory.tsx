import { Outlet } from "react-router-dom";
import TabBar from "./TabBar";

function GhostStory() {
  return (
	<div>
		<div className="flex justify-between">
			<h1 className="text-4xl font-bold">Tuesday Quiz Show</h1>
			<h1 className="text-4xl font-bold">Qterw-D-43</h1>
		</div>

		<div className="divider"></div>

		<TabBar />

		<div className="mt-6">
			<Outlet />
		</div>

	</div>);
}

export default GhostStory;