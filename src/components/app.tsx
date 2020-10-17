import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { useCurrentUserContext } from "../global-context/current-user/current-user.provider";
import { useIsSignedIn } from "../global-context/current-user/current-user.store";
import {
  FlashcardCreatePage,
  FlashcardListPage,
  FlashcardDetailPage,
  FlashcardEditPage,
  SignInPage,
  TopPage,
} from "./pages/index";
import { LoadingModal } from "./shared/loading-modal";
import { NotFoundErrorPage } from "./pages/errors/not-found-error";
import { TermsPage } from "./pages/terms";
import { PrivacyPage } from "./pages/privacy";

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

        <Route path="/sign-in" component={SignInPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route exact path="/" component={TopPage} />
        <Route path="*" component={NotFoundErrorPage} />
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
