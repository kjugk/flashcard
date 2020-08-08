import React, { FunctionComponent, useEffect } from "react";
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
import { useSystemContext } from "./shared/providers/system";

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

        {/* TODO トップページ作る */}
        <Route path="/" component={FlashcardListPage}></Route>
      </Switch>
    </Router>
  );
};

// ログイン「必須」ページのRoute
const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const { currentUserState } = useCurrentUserContext();
  const { systemDispatch } = useSystemContext();
  const isSignedIn = useIsSignedIn();

  useEffect(() => {
    if (!isSignedIn) {
      console.log("Hoge");
      systemDispatch({
        type: "set-system-info-message",
        payload: "ログインしてください",
      });
    }
  }, [isSignedIn]);

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
      {!isSignedIn && <Redirect to="sign-in" />}
    </Route>
  );
};

export default App;
