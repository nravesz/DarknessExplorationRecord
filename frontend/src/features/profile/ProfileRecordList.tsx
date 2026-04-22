import { useNavigate } from 'react-router-dom';
import { useMyRecords } from './hooks/useMyRecords';
import type { IRecord } from '../ghost-story/interfaces/IRecord';
import { ghostStoryPath } from '../../routes';

function ProfileRecordList() {
  const { records, loading, error } = useMyRecords();
  const navigate = useNavigate();

  if (loading) return <p className="text-base-content/60">Loading...</p>;
  if (error) return <p className="text-error">Error: {error}</p>;
  if (records.length === 0) return <p className="text-base-content/60">No records logged yet.</p>;

  return (
    <div className="flex flex-col gap-2">
      {records.map((record: IRecord) => (
        <div
          key={record.id}
          className="border-l-4 border-base-content/20 bg-base-200 px-5 py-4 cursor-pointer hover:bg-base-300 transition-colors"
          onClick={() => navigate(ghostStoryPath(record.ghostStory.id))}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold">{record.ghostStory.name}</span>
            <span className="text-xs text-base-content/40 font-mono">
              {new Date(record.encounteredAt).toLocaleDateString()}
            </span>
          </div>
          <span className="text-xs text-base-content/40 uppercase tracking-wide">Class {record.ghostStory.class}</span>
          {record.notes && (
            <div className="space-y-1 mt-2">
              {record.notes.split('\n').map((p, i) => (
                <p key={i} className="text-sm text-base-content/70 whitespace-pre-line">{p}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileRecordList;
