import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import FlashcardListPage from "./components/pages/flashcard-list";
import { FlashcardDetailPage } from "./components/pages/flashcard-detail";
import FlashcardCreatePage from "./components/pages/flashcard-create";
import "./App.css";
import { SignInPage } from "./components/pages/sign-in";
import { useCurrentUserContext, useIsSignedIn } from "./providers/current-user";
import { TopPage } from "./components/pages/top";
import { NotFoundPage } from "./components/pages/not-found";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/flashcard-list">
          <FlashcardListPage />
        </PrivateRoute>
        <PrivateRoute path="/flashcard-create">
          <FlashcardCreatePage />
        </PrivateRoute>
        <PrivateRoute path="/flashcard-detail/:id">
          <FlashcardDetailPage />
        </PrivateRoute>

        <Route path="/sign-in" exact component={SignInPage}></Route>
        <Route exact path="/" component={TopPage}></Route>
        <Route path="*" component={NotFoundPage}></Route>
      </Switch>
    </Router>
  );
};

// ログイン「必須」ページのRoute
const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const { currentUserState } = useCurrentUserContext();
  const isSignedIn = useIsSignedIn();

  if (!currentUserState.initialized) {
    return (
      <Route {...rest}>
        {!currentUserState.initialized && <div>loading...</div>}
      </Route>
    );
  }

  return (
    <Route {...rest}>
      {isSignedIn && children}
      {!isSignedIn && <Redirect to="/sign-in" />}
    </Route>
  );
};

export default App;
