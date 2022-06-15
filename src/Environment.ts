const baseAppPath = "";
const origin = 'https://koronaveiviser.intern.nav.no'

const Environment = () => {
  if (process.env.NODE_ENV === `development`) {
    return {
      miljo: `LOCAL`,
      baseUrl: `http://www.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `http://localhost:8080${baseAppPath}`,
      apiUrl: `http://localhost:8080${baseAppPath}/api`
    };
  }

  return {
    miljo: `PROD`,
    baseUrl: origin,
    baseAppPath: baseAppPath,
    appUrl: `${origin}${baseAppPath}`,
    apiUrl: `${origin}${baseAppPath}/api`
  };
};

export default Environment;
