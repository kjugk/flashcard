import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../../lib/cognito";
import { useIsSignedIn } from "../../../global/store/current-user.store";
import { useCurrentUserContext } from "../../../global/provider/current-user.provider";

export const Header: FunctionComponent = () => {
  const { currentUserState, currentUserDispatch } = useCurrentUserContext();
  const isSignedIn = useIsSignedIn(currentUserState);
  const handleSignOut = async () => {
    await signOut();
    currentUserDispatch({
      type: "sign-out",
    });
  };

  return (
    <div>
      <nav>
        <Link to="/">Flashcard</Link>
        <Link to="/flashcard-create">新規作成</Link>

        {isSignedIn && (
          <button type="button" onClick={handleSignOut}>
            ログアウト
          </button>
        )}
      </nav>
    </div>
  );
};
