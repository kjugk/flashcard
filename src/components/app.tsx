import React, { FC, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { useCurrentUserContext } from "../global-context/current-user/current-user.provider";
import { useIsSignedIn } from "../global-context/current-user/current-user.store";
import { LoadingModal } from "./shared/loading-modal";

const FlashcardListPage = lazy(() => import("./pages/flashcard-list"));
const FlashcardDetailPage = lazy(() => import("./pages/flashcard-detail"));
const FlashcardCreatePage = lazy(() => import("./pages/flashcard-create"));
const FlashcardEditPage = lazy(() => import("./pages/flashcard-edit"));
const SignInPage = lazy(() => import("./pages/sign-in"));
const TopPage = lazy(() => import("./pages/top"));
const TermsPage = lazy(() => import("./pages/terms"));
const PrivacyPage = lazy(() => import("./pages/privacy"));
const NotFoundErrorPage = lazy(() => import("./pages/errors/not-found-error"));

export const App: FC = () => (
  <>
    <Router>
      <Suspense fallback={<div />}>
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
      </Suspense>
    </Router>
    <LoadingModal />
  </>
);

// ログイン「必須」ページのRoute
const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
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
