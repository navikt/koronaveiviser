const baseAppPath = "";

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

  if (window.location.host === 'www.dev.nav.no') {
    return {
      miljo: `DEV`,
      baseUrl: `https://www.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://www.dev.nav.no${baseAppPath}`,
      apiUrl: `https://www.dev.nav.no${baseAppPath}/api`
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
