export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatVoteMessage = (name) => {
  return `Ваш голос за "${name}" учтен!`;
};
