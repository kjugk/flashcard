import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import { App } from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { SystemProvider } from "./global/system/system.provider";
import { CurrentUserProvider } from "./global/current-user/current-user.provider";
import { configureCognito } from "./lib/cognito";
import { SystemMessage } from "./components/shared";
import { FlashcardListPageProvider } from "./global/flashcard-list/flashcard-list.provider";

configureCognito();

ReactDOM.render(
  <React.StrictMode>
    {/* グローバルな context は、ここでネストして渡す */}
    <SystemProvider>
      <CurrentUserProvider>
        <FlashcardListPageProvider>
          <App />
          <SystemMessage />
        </FlashcardListPageProvider>
      </CurrentUserProvider>
    </SystemProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
