import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { useCurrentUserContext } from "../global/current-user/current-user.provider";
import { useIsSignedIn } from "../global/current-user/current-user.store";
import {
  FlashcardCreatePage,
  FlashcardListPage,
  FlashcardDetailPage,
  FlashcardEditPage,
  SignInPage,
  TopPage,
} from "./pages/index";
import { LoadingModal } from "./shared/loading-modal";
import { NotFound } from "./shared/not-found";

export const App: FunctionComponent = () => (
  <>
    <Router>
      <Switch>
        <PrivateRoute path="/flashcard-list">
          <FlashcardListPage />
        </PrivateRoute>

        <PrivateRoute path="/flashcard-create">
          <FlashcardCreatePage />
        </PrivateRoute>

        <PrivateRoute path="/flashcard-edit/:id">
          <FlashcardEditPage />
        </PrivateRoute>

        <PrivateRoute path="/flashcard-detail/:id">
          <FlashcardDetailPage />
        </PrivateRoute>

        <Route path="/sign-in" component={SignInPage}></Route>
        <Route exact path="/" component={TopPage}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
    <LoadingModal />
  </>
);

// ログイン「必須」ページのRoute
const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const { currentUserState } = useCurrentUserContext();
  const isSignedIn = useIsSignedIn(currentUserState);

  if (!currentUserState.initialized) {
    return <div>loading...</div>;
  }

  return (
    <Route {...rest}>
      {!isSignedIn && <Redirect to="/" />}
      {isSignedIn && children}
    </Route>
  );
};
