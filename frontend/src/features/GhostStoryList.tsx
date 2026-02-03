import { useGhostStories } from "../hooks/useGhostStory";

interface IGhostStory {
	_id: string;
	class: string;
	name: string;
}

function GhostStoryList() {
  const { stories, loading, error } = useGhostStories();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Ghost Stories</h1>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300">Class</th>
            <th className="border border-gray-300">Ghost Story</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((stories: IGhostStory) => (
            <tr
              key={stories._id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => console.log(stories)}
            >
              <td className="border border-gray-300">{stories.class}</td>
              <td className="border border-gray-300">{stories.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GhostStoryList;
