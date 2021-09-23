const baseAppPath = "/person/koronaveiviser";

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

  if (window.location.host === 'person.dev.nav.no') {
    return {
      miljo: `DEV`,
      baseUrl: `https://person.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://person.dev.nav.no${baseAppPath}`,
      apiUrl: `https://person.dev.nav.no${baseAppPath}/api`
    };
  }

  return {
    miljo: `PROD`,
    baseUrl: `https://www.nav.no`,
    baseAppPath: baseAppPath,
    appUrl: `https://www.nav.no${baseAppPath}`,
    apiUrl: `https://www.nav.no${baseAppPath}/api`
  };
};

export default Environment;
