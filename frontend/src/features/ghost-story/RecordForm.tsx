import { useCreateRecord } from './hooks/useCreateRecord';

interface RecordFormProps {
  ghostClass: string;
  storyId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

function RecordForm({ ghostClass, storyId, onSuccess, onCancel }: RecordFormProps) {
  const { notes, setNotes, submit, isPending, error } = useCreateRecord(ghostClass, storyId, onSuccess);

  return (
    <div className="mb-8">
      <div className="border-l-4 border-brand pl-4 mb-6">
        <div className="text-xs uppercase tracking-widest text-brand mb-1">New Record</div>
        <div className="text-2xl font-bold text-base-content/40">Log Encounter</div>
      </div>

      <div className="max-w-2xl border-l-4 border-base-content/20 pl-4 mb-6">
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Notes</div>
        <textarea
          className="textarea w-full bg-transparent resize-none placeholder:text-base-content/20 text-base-content/80 leading-relaxed"
          rows={4}
          placeholder="Describe the encounter..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && <p className="text-error text-sm mb-4">Failed to log record. Please try again.</p>}

      <div className="flex gap-3">
        <button className="btn btn-primary btn-sm" onClick={submit} disabled={isPending}>
          {isPending ? 'Logging...' : 'Log Record'}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel} disabled={isPending}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RecordForm;
