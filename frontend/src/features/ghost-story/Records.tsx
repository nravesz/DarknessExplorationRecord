import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import type { IGhostStory } from '../common/interfaces/IGhostStory';
import { useRecords } from './hooks/useRecords';
import { useAuth } from '../common/hooks/useAuth';
import RecordForm from './RecordForm';

function Records() {
  const story = useOutletContext<IGhostStory>();
  const { id } = useParams() as { id: string };
  const parts = id.split('-');
  const ghostClass = parts[parts.length - 2];
  const storyId = Number(parts[parts.length - 1]);

  const { records, loading, error, refetch } = useRecords(ghostClass, String(storyId));
  const { isLoggedIn } = useAuth();
  const [showForm, setShowForm] = useState(false);

  function handleSuccess() {
    setShowForm(false);
    refetch();
  }

  if (loading) return <p className="text-base-content/60">Loading records...</p>;
  if (error) return <p className="text-error">Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase tracking-widest text-base-content/40">
          {records.length} {records.length === 1 ? 'record' : 'records'} for {story?.name}
        </div>
        {isLoggedIn && !showForm && (
          <button className="btn btn-sm btn-outline" onClick={() => setShowForm(true)}>
            + Log Record
          </button>
        )}
      </div>

      {showForm && (
        <RecordForm
          ghostClass={ghostClass}
          storyId={storyId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {records.length === 0 ? (
        <p className="text-base-content/40 italic">No records logged for this ghost story yet.</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="border-l-4 border-base-content/20 bg-base-200 px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold capitalize">Agent {record.user}</span>
                <span className="text-xs text-base-content/40 font-mono">
                  {new Date(record.encounteredAt).toLocaleDateString()}
                </span>
              </div>
              {record.notes && (
                <p className="text-sm text-base-content/70">{record.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Records;
