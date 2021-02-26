const {
  injectDecoratorServerSide,
} = require("@navikt/nav-dekoratoren-moduler/ssr");

const getHtmlWithDecorator = (filePath) =>
  injectDecoratorServerSide({
    env: process.env.ENV,
    filePath: filePath,
    breadcrumbs: [
      {
        url: "https://www.nav.no/person/koronaveiviser/",
        title: "Koronavirus - hva gjelder i min situasjon?",
        handleInApp: true,
      },
    ],
  });

module.exports = getHtmlWithDecorator;
