import { api } from '../../../api/api';
import type { IGhostStory } from '../../common/interfaces/IGhostStory';

export interface ICreateGhostStoryPayload {
  name: string;
  class: string;
  summary?: string;
  mediumToEnter?: string;
  description?: string;
}

export const getGhostStories = async (): Promise<IGhostStory[]> => {
  const response = await api.get<IGhostStory[]>('/ghost-stories');
  return response.data;
};

export const getMyGhostStories = async (): Promise<IGhostStory[]> => {
  const response = await api.get<IGhostStory[]>('/ghost-stories/my');
  return response.data;
};

export const createGhostStory = async (payload: ICreateGhostStoryPayload): Promise<IGhostStory> => {
  const response = await api.post<IGhostStory>('/ghost-stories', payload);
  return response.data;
};
