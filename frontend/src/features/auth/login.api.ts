import { api } from '../../api/api';
import { ENDPOINTS } from '../../api/endpoints';
import type { ILoginPayload } from './interfaces/login-payload.interface';
import type { ILogin } from './interfaces/login.interface';

export const postLogin = async (payload: ILoginPayload): Promise<ILogin> => {
  const response = await api.post<ILogin>(ENDPOINTS.LOGIN, payload);
  return response.data;
};
