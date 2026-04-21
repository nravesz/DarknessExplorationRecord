import { api } from '../../../api/api';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ILogin } from '../interfaces/ILogin';
import type { ILoginPayload } from '../interfaces/ILoginPayload';
import type { IRegister } from '../interfaces/IRegister';
import type { IRegisterPayload } from '../interfaces/IRegisterPayload';

export const postLogin = async (payload: ILoginPayload): Promise<ILogin> => {
  const response = await api.post<ILogin>(ENDPOINTS.LOGIN, payload);
  return response.data;
};

export const postRegister = async (payload: IRegisterPayload): Promise<IRegister> => {
  const response = await api.post<IRegister>(ENDPOINTS.REGISTER, payload);
  return response.data;
};

export const postLogout = async (): Promise<void> => {
  await api.post(ENDPOINTS.LOGOUT);
};
