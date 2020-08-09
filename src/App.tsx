import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import FlashcardListPage from "./pages/flashcard-list-page/flashcard-list.page";
import { FlashcardDetailPage } from "./pages/flashcard-detail-page/flashcard-detail.page";
import FlashcardCreatePage from "./pages/flashcard-create-page/flashcard-create-page";
import "./App.css";
import { SignInPage } from "./pages/sign-in-page/sign-in-page";
import {
  useCurrentUserContext,
  useIsSignedIn,
} from "./shared/providers/current-user";
import { TopPage } from "./pages/top-page";
import { NotFoundPage } from "./pages/not-found-page";

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
