import { LABELS, MAIN_COLORS } from '../../constants';

export const getData = (value: number[]) => {
  return {
    labels: LABELS,
    datasets: [
      {
        data: value,
        backgroundColor: MAIN_COLORS,
      },
    ],
  };
};
