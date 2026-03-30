import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createGhostStory, type ICreateGhostStoryPayload } from '../api/ghostStory.service';
import { ghostStoryPath } from '../routes';

const GHOST_CLASSES = ['A', 'B', 'C', 'D', 'Twilight'];

function CreateGhostStoryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ICreateGhostStoryPayload>({
    name: '',
    class: '',
    summary: '',
    mediumToEnter: '',
    description: '',
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: createGhostStory,
    onSuccess: (story) => {
      navigate(ghostStoryPath(story.id));
    },
  });

  function handleChange(field: keyof ICreateGhostStoryPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    mutate(form);
  }

  const canSubmit = form.name.trim() !== '' && form.class !== '';

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
          {GHOST_CLASSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="max-w-2xl space-y-6 mb-10">
        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Summary</div>
          <textarea
            className="textarea w-full bg-transparent resize-none placeholder:text-base-content/20 text-base-content/80 leading-relaxed"
            rows={2}
            placeholder="Short summary..."
            value={form.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </div>

        <div className="border-l-4 border-brand pl-4">
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Medium to Enter</div>
          <textarea
            className="textarea w-full bg-transparent resize-none placeholder:text-base-content/20 text-base-content/80 leading-relaxed"
            rows={2}
            placeholder="How to encounter the entity..."
            value={form.mediumToEnter}
            onChange={(e) => handleChange('mediumToEnter', e.target.value)}
          />
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-base-content/40 mb-3">Description</div>
          <textarea
            className="textarea w-full bg-transparent resize-none placeholder:text-base-content/20 text-base-content/70 leading-relaxed"
            rows={6}
            placeholder="Full description..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="text-error text-sm mb-4">Failed to create ghost story. Please try again.</p>
      )}

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={!canSubmit || isPending}
      >
        {isPending ? 'Creating...' : 'Create Ghost Story'}
      </button>
    </div>
  );
}

export default CreateGhostStoryPage;
