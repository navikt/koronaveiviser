import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";

import "unorm";
// import "proxy-polyfill";

// Functions
export const { _babelPolyfill } = window as any;
if (!_babelPolyfill) {
  require("babel-polyfill");
}