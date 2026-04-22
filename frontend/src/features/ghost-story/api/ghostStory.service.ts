import { api } from '../../../api/api';
import type { IGhostStory } from '../../common/interfaces/IGhostStory';
import type { IRecord } from '../interfaces/IRecord';
import type { ICreateRecordPayload } from '../interfaces/ICreateRecordPayload';

export const getGhostStory = async (ghostClass: string, id: string): Promise<IGhostStory> => {
  const response = await api.get<IGhostStory>(`/ghost-stories/${ghostClass}/${id}`);
  return response.data;
};

export const getRecords = async (ghostClass: string, storyId: string): Promise<IRecord[]> => {
  const response = await api.get<IRecord[]>(`/records/${ghostClass}/${storyId}`);
  return response.data;
};

export const createRecord = async (payload: ICreateRecordPayload): Promise<IRecord> => {
  const token = localStorage.getItem('accessToken');
  const response = await api.post<IRecord>('/records', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
