// Функция для получения случайного числа (используется для счетчика)
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для форматирования текста (если понадобится)
export const formatVoteMessage = (name) => {
  return `Ваш голос за "${name}" учтен!`;
};
