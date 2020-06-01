import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FlashcardListPage from "./pages/flashcard-list-page/flashcard-list.page";
import FlashcardDetailPage from "./pages/flashcard-detail-page/flashcard-detail.page";
import "./App.css";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/flashcard-list" component={FlashcardListPage}></Route>
        <Route
          path="/flashcard-detail/:id"
          component={FlashcardDetailPage}
        ></Route>
        <Route path="/" component={FlashcardListPage}></Route>
      </Switch>
    </Router>
  );
};

export default App;
