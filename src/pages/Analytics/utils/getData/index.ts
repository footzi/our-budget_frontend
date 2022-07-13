import { COLORS, LABELS } from '../../constants';

export const getData = (value: number[]) => {
  return {
    labels: LABELS,
    datasets: [
      {
        data: value,
        backgroundColor: COLORS,
      },
    ],
  };
};
