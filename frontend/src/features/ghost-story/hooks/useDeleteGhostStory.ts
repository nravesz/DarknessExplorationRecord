import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteGhostStory } from '../api/ghostStory.service';
import { ROUTES } from '../../../routes';

export function useDeleteGhostStory(storyId: string) {
  const navigate = useNavigate();
  const parts = storyId.split('-');
  const ghostClass = parts[parts.length - 2];
  const id = parts[parts.length - 1];

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => deleteGhostStory(ghostClass, id),
    onSuccess: () => navigate(ROUTES.GHOST_STORIES),
  });

  return { deleteStory: () => mutate(), isPending, error };
}
