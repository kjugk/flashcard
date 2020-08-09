import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import "./App.css";
import * as pages from "./components/pages/index";
import { useCurrentUserContext, useIsSignedIn } from "./providers/current-user";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/flashcard-list">
          <pages.FlashcardListPage />
        </PrivateRoute>
        <PrivateRoute path="/flashcard-create">
          <pages.FlashcardCreatePage />
        </PrivateRoute>
        <PrivateRoute path="/flashcard-detail/:id">
          <pages.FlashcardDetailPage />
        </PrivateRoute>

        <Route path="/sign-in" exact component={pages.SignInPage}></Route>
        <Route exact path="/" component={pages.TopPage}></Route>
        <Route path="*" component={pages.NotFoundPage}></Route>
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
