
export const fixLocalStorageForSafari = () => {
  // const sessionSetItemReal = sessionStorage.setItem;
  // const localSetItemReal = localStorage.setItem;

  var func1 = (key: string, value: string) => {
    try {
      // sessionSetItemReal(key, value);
      console.log("test1");
    }
    catch (error) {
      console.log(error);
    }
  };

  var func2 = (key: string, value: string) => {
    try {
      // localSetItemReal(key, value);
      console.log("test2");
    }
    catch (error) {
      console.log(error);
    }
  };
};
