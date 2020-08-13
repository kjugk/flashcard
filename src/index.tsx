import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { SystemProvider } from "./providers/system";
import { CurrentUserProvider } from "./providers/current-user";
import { configureCognito } from "./lib/cognito";
import { SystemMessage } from "./components/shared";

configureCognito();

ReactDOM.render(
  <React.StrictMode>
    {/* グローバルな context は、ここでネストして渡す */}
    <SystemProvider>
      <CurrentUserProvider>
        <App />
        <SystemMessage />
      </CurrentUserProvider>
    </SystemProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
