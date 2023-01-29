// Get the current year
const getCurrentYear = (): number => {
  const currentTime = new Date();
  return currentTime.getFullYear();
};

export default getCurrentYear;
