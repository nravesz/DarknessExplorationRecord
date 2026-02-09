import { api } from '../../api/api';
import { ENDPOINTS } from '../../api/endpoints';
import type { ILogin } from './interfaces/login.interface';

export const getLogin = async (): Promise<ILogin> => {
  const response = await api.get<ILogin>(ENDPOINTS.LOGIN);
  return response.data;
};
