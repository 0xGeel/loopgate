export const getCurrentYear = (): number => {
  const currentTime = new Date();
  return currentTime.getFullYear();
};
