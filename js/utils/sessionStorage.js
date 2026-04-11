export const setSessionFlag = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionFlag = (key) => {
  const item = sessionStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return item;
  }
};
