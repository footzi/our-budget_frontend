export const getOptions = (title: string) => {
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
        display: false,
      },
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };
};
