export const passwordValidator = (value1: string, value2: string) => {
  if (!value1 || !value2 || value1 === value2) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Пароли должны совпадать'));
  }
};
