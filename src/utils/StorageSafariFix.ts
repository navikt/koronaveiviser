
export const fixLocalStorageForSafari = () => {
  try {
    const sessionSetItemReal = sessionStorage.setItem.bind(sessionStorage);
    const localSetItemReal = localStorage.setItem.bind(localStorage);

    sessionStorage.setItem = (key: string, value: string) => {
      try {
        sessionSetItemReal(key, value);
        console.log("test1");
      }
      catch (error) {
        console.log(error);
      }
    };

    localStorage.setItem = (key: string, value: string) => {
      try {
        localSetItemReal(key, value);
        console.log("test2");
      }
      catch (error) {
        console.log(error);
      }
    };
  }
  catch (error) {
    console.log(error);
  }
};
