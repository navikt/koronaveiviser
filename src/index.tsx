import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import withMenu from "./clients/apiMock/decorator/decorator-header";
import footer from "./clients/apiMock/decorator/decorator-footer";
import scripts from "./clients/apiMock/decorator/decorator-scripts";
import styles from "./clients/apiMock/decorator/decorator-styles";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { StoreProvider } from "./store/Provider";
import { initialState, reducer } from "./store/store";
import { initGA } from "./utils/react-ga";

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_HEADER}}}",
      withMenu
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_FOOTER}}}",
      footer
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_STYLES}}}",
      styles
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_SCRIPTS}}}",
      scripts
    );

    // Execute client.js
    var script = document.createElement("script");
    script.src = "https://www.nav.no/dekoratoren/client.js";
    document.body.appendChild(script);
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
