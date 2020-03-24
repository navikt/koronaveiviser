
export const fixLocalStorageForSafari = () => {
  const sessionSetItemReal = sessionStorage.setItem.bind(sessionStorage);
  const localSetItemReal = localStorage.setItem.bind(localStorage);

  sessionStorage.setItem = (key: string, value: string) => {
    try {
      sessionSetItemReal(key, value);
    }
    catch (error) {
      console.error(error);
    }
  };

  localStorage.setItem = (key: string, value: string) => {
    try {
      localSetItemReal(key, value);
    }
    catch (error) {
      console.error(error);
    }
  };
};
