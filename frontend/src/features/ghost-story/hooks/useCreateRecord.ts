import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createRecord } from '../../../api/ghostStory.service';

export function useCreateRecord(ghostClass: string, storyId: number, onSuccess: () => void) {
  const [notes, setNotes] = useState('');

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: () => createRecord({ class: ghostClass, storyId, notes }),
    onSuccess: () => {
      setNotes('');
      reset();
      onSuccess();
    },
  });

  return { notes, setNotes, submit: () => mutate(), isPending, error };
}
