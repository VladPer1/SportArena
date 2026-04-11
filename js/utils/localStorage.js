const DEFAULT_EXPIRATION = 600000; // 10 минут

export const setLocalCache = (key, data) => {
  const cacheData = {
    timestamp: Date.now(),
    value: data,
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

export const getLocalCache = (key, expiration = DEFAULT_EXPIRATION) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const { timestamp, value } = JSON.parse(cached);
    if (Date.now() - timestamp > expiration) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch (e) {
    console.error("Ошибка парсинга LocalStorage:", e);
    return null;
  }
};
