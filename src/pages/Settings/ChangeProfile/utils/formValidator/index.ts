import { SettingsFormBody } from '../../interfaces';

export const formValidator = (body: SettingsFormBody) => {
  if (Object.keys(body).length === 0) {
    return true;
  }

  const { firstName, currencies, balances } = body;
  const isCorrectBalances = Object.values(balances).every((item) => item !== null);

  return firstName && currencies?.length > 0 && isCorrectBalances;
};
