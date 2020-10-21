import loadable from "@loadable/component";
import React, { FC, Suspense } from "react";
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

const FlashcardListPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/flashcard-list")
);
const FlashcardDetailPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/flashcard-detail")
);
const FlashcardCreatePage = loadable(() => import("./pages/flashcard-create"));
const FlashcardEditPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/flashcard-edit")
);
const SignInPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/sign-in")
);
const TopPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/top")
);
const TermsPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/terms")
);
const PrivacyPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/privacy")
);
const NotFoundErrorPage = loadable(
  () => import(/* webpackPrefetch: true */ "./pages/errors/not-found-error")
);

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
