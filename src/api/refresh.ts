import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { UserLocalStorage } from '@/interfaces';
import { LocalStorage } from '@/utils/localStorage';
import axios, { AxiosError } from 'axios';

const BACKEND_HOST = process.env.BACKEND_HOST ?? '/';

export const refreshAuthLogic = async (failedRequest: AxiosError): Promise<void | string | undefined> => {
  const savedUser = LocalStorage.get<UserLocalStorage>(LOCAL_STORAGE_ITEMS.USER);

  if (!savedUser) {
    return Promise.reject();
  }

  try {
    const response = await axios({
      method: 'put',
      url: BACKEND_HOST + '/api/auth/refresh',
      headers: {
        Authorization: 'Bearer ' + savedUser.tokens.refreshToken,
      },
    });

    const accessToken = response?.data?.tokens.accessToken;
    const refreshToken = response?.data?.tokens.refreshToken;

    if (accessToken && refreshToken) {
      const updatedUser = { ...savedUser, tokens: { accessToken, refreshToken } };
      LocalStorage.set<UserLocalStorage>(LOCAL_STORAGE_ITEMS.USER, updatedUser);

      if (failedRequest?.response?.config?.headers) {
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
      }
      return Promise.resolve();
    } else {
      LocalStorage.remove(LOCAL_STORAGE_ITEMS.USER);
      return Promise.reject();
    }
  } catch (e) {
    LocalStorage.remove(LOCAL_STORAGE_ITEMS.USER);
    return Promise.reject();
  }
};
