import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { FlashcardListPage } from "./pages/flashcard-list-page/FlashcardListPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/flashcard-list">
          <FlashcardListPage></FlashcardListPage>
        </Route>
        <Route path="/">
          <FlashcardListPage></FlashcardListPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
