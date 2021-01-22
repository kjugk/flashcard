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
import { FlashcardListPage } from "./pages/flashcard-list";
import { FlashcardDetailPage } from "./pages/flashcard-detail";
import { FlashcardCreatePage } from "./pages/flashcard-create";
import { FlashcardEditPage } from "./pages/flashcard-edit";
import { SignInPage } from "./pages/sign-in";
import { TopPage } from "./pages/top";

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
  const isSignedIn = useIsSignedIn();

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
