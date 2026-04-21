import { api } from './api';
import type { IGhostStory } from '../interfaces/IGhostStory';
import type { IRecord } from '../features/ghost-story/interfaces/IRecord';

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

export const getGhostStory = async (ghostClass: string, id: string): Promise<IGhostStory> => {
  const response = await api.get<IGhostStory>(`/ghost-stories/${ghostClass}/${id}`);
  return response.data;
};

export const getMyGhostStories = async (): Promise<IGhostStory[]> => {
  const token = localStorage.getItem('accessToken');
  const response = await api.get<IGhostStory[]>('/ghost-stories/my', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getRecords = async (ghostClass: string, storyId: string): Promise<IRecord[]> => {
  const response = await api.get<IRecord[]>(`/records/${ghostClass}/${storyId}`);
  return response.data;
};

export const createGhostStory = async (payload: ICreateGhostStoryPayload): Promise<IGhostStory> => {
  const token = localStorage.getItem('accessToken');
  const response = await api.post<IGhostStory>('/ghost-stories', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
