export const generateYearChart = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 2020 + 1 }, (_, i) => (2020 + i).toString());
};
