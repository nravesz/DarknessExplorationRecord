function GhostStoryList() {
	const items = [
		["D","Tuesday Show"],
		["A", "Hell Taxi"]
	]

	const handleClick = (event: MouseEvent) => console.log(event);

	return (
		<>
			<h1>Ghost Stories</h1>
			<table className="border-collapse border border-gray-400 ...">
				<thead>
					<tr>
						<th className="border border-gray-300 ...">Class</th>
						<th className="border border-gray-300 ...">Ghost Story</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => 
						<tr
							key={index}
							onClick={(event) => console.log(event)}
						>
							<td className="border border-gray-300 ...">{item[0]}</td>
							<td className="border border-gray-300 ...">{item[1]}</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
}

export default GhostStoryList;
