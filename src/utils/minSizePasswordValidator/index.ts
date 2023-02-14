import { PASSWORD_MIN_LENGTH } from '@/constants';

export const minSizePasswordValidator = (value: string) => {
  if (value.length >= PASSWORD_MIN_LENGTH) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(`Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`));
  }
};
