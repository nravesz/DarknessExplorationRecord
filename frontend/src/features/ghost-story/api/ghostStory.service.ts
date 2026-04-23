import { api } from '../../../api/api';
import type { IGhostStory } from '../../common/interfaces/IGhostStory';
import type { IRecord } from '../interfaces/IRecord';
import type { ICreateRecordPayload } from '../interfaces/ICreateRecordPayload';
import type { ICreateGhostStoryPayload } from '../interfaces/ICreateGhostStoryPayload';
import type { IEditGhostStoryPayload } from '../interfaces/IEditGhostStoryPayload';

export type { ICreateGhostStoryPayload, IEditGhostStoryPayload };

export const getGhostStory = async (ghostClass: string, id: string): Promise<IGhostStory> => {
  const response = await api.get<IGhostStory>(`/ghost-stories/${ghostClass}/${id}`);
  return response.data;
};

export const createGhostStory = async (payload: ICreateGhostStoryPayload): Promise<IGhostStory> => {
  const response = await api.post<IGhostStory>('/ghost-stories', payload);
  return response.data;
};

export const patchGhostStory = async (
  ghostClass: string,
  storyId: string,
  payload: IEditGhostStoryPayload
): Promise<IGhostStory> => {
  const response = await api.patch<IGhostStory>(`/ghost-stories/${ghostClass}/${storyId}`, payload);
  return response.data;
};

export const deleteGhostStory = async (ghostClass: string, storyId: string): Promise<void> => {
  await api.delete(`/ghost-stories/${ghostClass}/${storyId}`);
};

export const getAllRecords = async (): Promise<IRecord[]> => {
  const response = await api.get<IRecord[]>('/records');
  return response.data;
};

export const getMyRecords = async (): Promise<IRecord[]> => {
  const response = await api.get<IRecord[]>('/records/my');
  return response.data;
};

export const getRecords = async (ghostClass: string, storyId: string): Promise<IRecord[]> => {
  const response = await api.get<IRecord[]>(`/records/${ghostClass}/${storyId}`);
  return response.data;
};

export const createRecord = async (payload: ICreateRecordPayload): Promise<IRecord> => {
  const response = await api.post<IRecord>('/records', payload);
  return response.data;
};

export const patchRecord = async (id: string, notes: string): Promise<IRecord> => {
  const response = await api.patch<IRecord>(`/records/${id}`, { notes });
  return response.data;
};

export const deleteRecord = async (id: string): Promise<void> => {
  await api.delete(`/records/${id}`);
};
