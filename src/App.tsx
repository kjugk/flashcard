import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FlashcardListPage from "./pages/flashcard-list-page/FlashcardListPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/flashcard-list" component={FlashcardListPage}></Route>
        <Route path="/" component={FlashcardListPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
