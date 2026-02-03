import { api } from './api';
import type { IGhostStory } from '../interfaces/IGhostStory';

export const getGhostStories = async (): Promise<IGhostStory[]> => {
  const response = await api.get<IGhostStory[]>('/ghost-stories');
  return response.data;
};
