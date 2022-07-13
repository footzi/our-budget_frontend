export const getOptionsPolar = (title: string) => {
  return {
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        },
        padding: {
          bottom: 24,
        },
      },
      legend: {
        display: true,
      },
    },
  };
};
