import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { patchGhostStory } from '../api/ghostStory.service';
import type { IGhostStory } from '../../common/interfaces/IGhostStory';
import { ghostStoryPath, ROUTES } from '../../../routes';

export function useEditGhostStory(story: IGhostStory) {
  const navigate = useNavigate();
  const parts = story.id.split('-');
  const ghostClass = parts[parts.length - 2];
  const storyId = parts[parts.length - 1];

  const [form, setForm] = useState({
    name: story.name ?? '',
    summary: story.summary ?? '',
    mediumToEnter: story.mediumToEnter ?? '',
    description: story.description ?? '',
  });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => patchGhostStory(ghostClass, storyId, form),
    onSuccess: () => navigate(`${ghostStoryPath(story.id)}/${ROUTES.GHOST_STORY_TABS.OVERVIEW}`),
  });

  const canSubmit = form.name.trim() !== '';

  return { form, handleChange, submit: () => mutate(), isPending, error, canSubmit };
}
