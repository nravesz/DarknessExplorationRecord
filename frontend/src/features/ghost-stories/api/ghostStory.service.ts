import { api } from '../../../api/api';
import type { IGhostStory } from '../../common/interfaces/IGhostStory';

export const getGhostStories = async (): Promise<IGhostStory[]> => {
  const response = await api.get<IGhostStory[]>('/ghost-stories');
  return response.data;
};

export const getMyGhostStories = async (): Promise<IGhostStory[]> => {
  const response = await api.get<IGhostStory[]>('/ghost-stories/my');
  return response.data;
};

export const getRecentGhostStories = async (limit = 5): Promise<IGhostStory[]> => {
  const response = await api.get<IGhostStory[]>(`/ghost-stories/recent?limit=${limit}`);
  return response.data;
};
