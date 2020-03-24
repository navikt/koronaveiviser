
export const setStorageItem = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  }
  catch (e) {
    console.log(e);
  }
};

export const getStorageItem = (key: string) => sessionStorage.getItem(key);
