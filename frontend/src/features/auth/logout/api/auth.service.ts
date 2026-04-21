import { api } from '../../../api/api';
import { ENDPOINTS } from '../../../api/endpoints';

export const postLogout = async (): Promise<void> => {
  await api.post(ENDPOINTS.LOGOUT);
};
