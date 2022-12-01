// eslint-disable-next-line
export const getIsEmptyObject = (obj: any) => {
  if (typeof obj !== 'object') {
    return false;
  }
  return Object.keys(obj).length === 0;
};
