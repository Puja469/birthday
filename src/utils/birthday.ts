export const isBirthday = () => {
  const now = new Date();
  return now.getMonth() + 1 === 7 && now.getDate() === 20;
};