import { api } from '../../../../api/api';
import { ENDPOINTS } from '../../../../api/endpoints';
import type { ILoginPayload } from '../interfaces/ILoginPayload';
import type { ILogin } from '../interfaces/ILogin';

export const postLogin = async (payload: ILoginPayload): Promise<ILogin> => {
  const response = await api.post<ILogin>(ENDPOINTS.LOGIN, payload);
  return response.data;
};
