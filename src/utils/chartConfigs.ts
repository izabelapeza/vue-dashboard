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
    options: {
      responsive: true,
    },
  };
};

export const pluralBarChart = (
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[]
) => {
  return {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
    },
  };
};

export const doughnutChart = (
  labels: string[],
  label: string,
  color: string[],
  data: number[]
) => {
  return {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          backgroundColor: color,
          borderColor: "rgba(0, 0, 0, 0)",
          data: data,
        },
      ],
    },
    options: {
      responsive: true,
    },
  };
};

export const lineChart = (
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[]
) => {
  return {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
    },
  };
};
