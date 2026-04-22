import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createGhostStory, type ICreateGhostStoryPayload } from '../api/ghostStory.service';
import { ghostStoryPath } from '../../../routes';

const EMPTY_FORM: ICreateGhostStoryPayload = {
  name: '',
  class: '',
  summary: '',
  mediumToEnter: '',
  description: '',
};

export function useCreateGhostStory() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ICreateGhostStoryPayload>(EMPTY_FORM);

  const { mutate, isPending, error } = useMutation({
    mutationFn: createGhostStory,
    onSuccess: (story) => navigate(ghostStoryPath(story.id)),
  });

  function handleChange(field: keyof ICreateGhostStoryPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const canSubmit = form.name.trim() !== '' && form.class !== '';

  return { form, handleChange, submit: () => mutate(form), isPending, error, canSubmit };
}
