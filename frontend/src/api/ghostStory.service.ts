import { api } from './api';
import type { IGhostStory } from '../interfaces/IGhostStory';

export const getGhostStories = async (): Promise<IGhostStory[]> => {
  const response = await api.get<IGhostStory[]>('/ghost-stories');
  return response.data;
};

export const getGhostStory = async (ghostClass: string, id: string): Promise<IGhostStory> => {
  const response = await api.get<IGhostStory>(`/ghost-stories/${ghostClass}/${id}`);
  return response.data;
};
