export const getStorageData = () => {
  return JSON.parse(localStorage.getItem("petientData")) || [];
};

export const setStorageData = (data) => {
  localStorage.setItem("petientData", JSON.stringify(data));
};
