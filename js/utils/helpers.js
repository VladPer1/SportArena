// Функция для получения случайного числа (используется для счетчика)
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для форматирования текста (если понадобится)
export const formatVoteMessage = (name) => {
  return `Ваш голос за "${name}" учтен!`;
};

// Асинхронный запрос к API
// helpers.js
export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка сервера");
    return await response.json();
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
};
// Сохранение в LocalStorage с меткой времени (кэширование)
export const setCache = (key, data) => {
  const cacheData = {
    timestamp: Date.now(),
    value: data,
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

// Получение данных из ккеша (актуальность 10 минут)
export const getCache = (key, expiration = 600000) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { timestamp, value } = JSON.parse(cached);
  if (Date.now() - timestamp > expiration) {
    localStorage.removeItem(key);
    return null;
  }
  return value;
};
