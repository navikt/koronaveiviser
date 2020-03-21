const Environment = () => {
  const host = window.location.host;
  const subdomain = host.split(`.`)[0];
  const baseAppPath = "/person/koronaveiviser";

  if (process.env.NODE_ENV === `development`) {
    return {
      miljo: `LOCAL`,
      baseUrl: `http://www.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `http://localhost:8080${baseAppPath}`,
      apiUrl: `http://localhost:8080${baseAppPath}/api`
    };
  }
  if (subdomain !== `www`) {
    // Preprod - Q0, Q1 etc
    const env = subdomain.split(`-`)[1];
    return {
      miljo: `DEV`,
      baseUrl: `https://www-${env}.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://www-${env}.nav.no${baseAppPath}`,
      apiUrl: `https://www-${env}.nav.no${baseAppPath}/api`
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
