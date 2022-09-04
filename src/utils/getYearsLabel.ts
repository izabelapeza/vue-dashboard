const getYearsLabel = (firstYear: number, lastYear: number): string[] => {
  const years: string[] = [];
  for (let i = firstYear; i <= lastYear; i++) {
    years.push(i.toString());
  }
  return years;
};

export default getYearsLabel;
