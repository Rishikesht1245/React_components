export const useLocalStorage = () => {
  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  return {
    setItem,
    getItem,
  };
};
