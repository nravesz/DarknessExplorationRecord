import { api } from '../../api/api';
import { ENDPOINTS } from '../../api/endpoints';
import type { IRegisterPayload } from './interfaces/register-payload.interface';
import type { IRegister } from './interfaces/register.interface';

export const postRegister = async (payload: IRegisterPayload): Promise<IRegister> => {
  const response = await api.post<IRegister>(ENDPOINTS.REGISTER, payload);
  return response.data;
};
