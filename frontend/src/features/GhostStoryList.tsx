import axios from 'axios';
import { useEffect, useState } from 'react';

interface IGhostStory {
	_id: string;
	class: string;
	name: string;
}

function GhostStoryList() {
	const [stories, setStories] = useState<IGhostStory[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGhostStories = async () => {
			try {
				const response = await axios.get<IGhostStory[]>('http://localhost:3000/ghost-stories');
				setStories(response.data);
			} catch (err: any) {
				setError(err.message || 'Error al obtener ghost stories');
			} finally {
				setLoading(false);
			}
		};
		fetchGhostStories();
	});

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>Error: {error}</p>;

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
					{stories.map((story) => (
						<tr
							key={story._id}
							onClick={() => console.log('Clicked story:', story)}
							className="hover:bg-gray-100 cursor-pointer"
						>
							<td className="border border-gray-300">{story.class}</td>
							<td className="border border-gray-300">{story.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default GhostStoryList;
