import { useParams, useNavigate } from 'react-router-dom';
import { ghostStoryPath } from '../../routes';
import { useGhostStory } from './hooks/useGhostStory';
import { useEditGhostStory } from './hooks/useEditGhostStory';
import type { IGhostStory } from '../common/interfaces/IGhostStory';

interface LabeledFieldProps {
  label: string;
  children: React.ReactNode;
  bordered?: boolean;
}

function LabeledField({ label, children, bordered = true }: LabeledFieldProps) {
  return (
    <div className={bordered ? 'border-l-4 border-brand pl-4' : ''}>
      <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">{label}</div>
      {children}
    </div>
  );
}

function EditGhostStoryFormInner({ story }: { story: IGhostStory }) {
  const navigate = useNavigate();
  const { form, handleChange, submit, isPending, error, canSubmit } = useEditGhostStory(story);

  return (
    <div>
      <div className="border-l-4 border-brand pl-4 mb-8">
        <div className="text-xs uppercase tracking-widest text-brand mb-1">Edit Ghost Story</div>
        <div className="flex items-baseline justify-between gap-4">
          <input
            className="text-4xl font-bold bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="Story name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <span className="font-mono text-sm text-base-content/40 shrink-0">{story.id}</span>
        </div>
      </div>

      <div className="max-w-lg border-l-4 border-brand bg-base-200 px-5 py-4 mb-10">
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Darkness Class</div>
        <span className="text-sm font-semibold">{story.class}</span>
      </div>

      <div className="max-w-2xl space-y-6 mb-10">
        <LabeledField label="Summary">
          <textarea
            className="textarea w-full bg-transparent resize-none placeholder:text-base-content/20 text-base-content/80 leading-relaxed"
            rows={2}
            placeholder="Short summary..."
            value={form.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </LabeledField>

        <LabeledField label="Medium to Enter">
          <textarea
            className="textarea w-full bg-transparent resize-none placeholder:text-base-content/20 text-base-content/80 leading-relaxed"
            rows={2}
            placeholder="How to encounter the entity..."
            value={form.mediumToEnter}
            onChange={(e) => handleChange('mediumToEnter', e.target.value)}
          />
        </LabeledField>

        <LabeledField label="Description" bordered={false}>
          <textarea
            className="textarea w-full bg-transparent resize-none placeholder:text-base-content/20 text-base-content/70 leading-relaxed"
            rows={6}
            placeholder="Full description..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </LabeledField>
      </div>

      {error && <p className="text-error text-sm mb-4">Failed to save changes. Please try again.</p>}

      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={submit} disabled={!canSubmit || isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
        <button className="btn btn-ghost" onClick={() => navigate(ghostStoryPath(story.id))} disabled={isPending}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function EditGhostStoryForm() {
  const { id } = useParams() as { id: string };
  const parts = id.split('-');
  const ghostClass = parts[parts.length - 2];
  const storyId = parts[parts.length - 1];

  const { story, loading, error } = useGhostStory(ghostClass, storyId);

  if (loading) return <p className="text-base-content/60">Loading...</p>;
  if (error || !story) return <p className="text-error">Error: {error}</p>;

  return <EditGhostStoryFormInner story={story} />;
}

export default EditGhostStoryForm;
