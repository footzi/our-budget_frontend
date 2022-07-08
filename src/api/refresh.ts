import { LocalStorageItems } from '@/constants';
import { UserLocalStorage } from '@/interfaces';
import { LocalStorage } from '@/utils/localStorage';
import axios, { AxiosError } from 'axios';

const BACKEND_HOST = process.env.BACKEND_HOST ?? '/';

export const refreshAuthLogic = async (failedRequest: AxiosError): Promise<void | string | undefined> => {
  const savedUser = LocalStorage.get<UserLocalStorage>(LocalStorageItems.USER);

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
      LocalStorage.set<UserLocalStorage>(LocalStorageItems.USER, updatedUser);

      if (failedRequest?.response?.config?.headers) {
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
      }
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};
