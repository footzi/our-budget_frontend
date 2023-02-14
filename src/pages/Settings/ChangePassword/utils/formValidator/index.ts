import { ChangePasswordForm } from '../../interfaces';

export const formValidator = (form: ChangePasswordForm): boolean => {
  const values = Object.values(form);

  if (values.length === 0) {
    return false;
  }

  return values.every((item) => Boolean(item));
};
