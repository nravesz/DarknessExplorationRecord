import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { patchRecord } from '../api/ghostStory.service';

export function useEditRecord(recordId: string, initialNotes: string, onSuccess: () => void) {
  const [notes, setNotes] = useState(initialNotes);

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: () => patchRecord(recordId, notes),
    onSuccess: () => {
      reset();
      onSuccess();
    },
  });

  return { notes, setNotes, submit: () => mutate(), isPending, error };
}
