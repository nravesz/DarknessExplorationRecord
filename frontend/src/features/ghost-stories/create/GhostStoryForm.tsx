import { useCreateGhostStory } from './useCreateGhostStory';

const GHOST_CLASSES = ['A', 'B', 'C', 'D', 'Twilight'];

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

function GhostStoryForm() {
  const { form, handleChange, submit, isPending, error, canSubmit } = useCreateGhostStory();

  return (
    <div>
      <div className="border-l-4 border-brand pl-4 mb-8">
        <div className="text-xs uppercase tracking-widest text-brand mb-1">New Ghost Story</div>
        <div className="flex items-baseline justify-between gap-4">
          <input
            className="text-4xl font-bold bg-transparent outline-none w-full placeholder:text-base-content/20"
            placeholder="Story name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <span className="font-mono text-sm text-base-content/20 shrink-0">ID will be assigned</span>
        </div>
      </div>

      <div className="max-w-lg border-l-4 border-brand bg-base-200 px-5 py-4 mb-10">
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-3">Darkness Class</div>
        <select
          className="select select-sm w-full max-w-xs"
          value={form.class}
          onChange={(e) => handleChange('class', e.target.value)}
        >
          <option value="" disabled>Select class</option>
          {GHOST_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
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

      {error && <p className="text-error text-sm mb-4">Failed to create ghost story. Please try again.</p>}

      <button className="btn btn-primary" onClick={submit} disabled={!canSubmit || isPending}>
        {isPending ? 'Creating...' : 'Create Ghost Story'}
      </button>
    </div>
  );
}

export default GhostStoryForm;
