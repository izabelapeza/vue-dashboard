export const barChart = (
  labels: string[],
  label: string,
  color: string,
  data: number[]
) => {
  return {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          backgroundColor: color,
          data: data,
        },
      ],
    },
    options: {},
  };
};
