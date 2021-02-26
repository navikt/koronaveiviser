import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { StoreProvider } from "./store/Provider";
import { initialState, reducer } from "./store/store";
import { initGA } from "./utils/react-ga";

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await injectDecoratorClientSide({
      env: "localhost",
      port: 8100,
      breadcrumbs: [
        {
          title: "Korona - hva gjelder i min situasjon?",
          url: "https://www.nav.no/person/koronaveiviser/"
        }
      ]
    });
  }

  initGA();
  ReactDOM.render(
    <StoreProvider reducer={reducer} initialState={initialState}>
      <App />
    </StoreProvider>,
    document.getElementById("app")
  );
  serviceWorker.unregister();
};
init();
