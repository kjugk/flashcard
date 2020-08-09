import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useIsSignedIn } from "../../../providers/current-user";
import { signOut } from "../../../lib/cognito";

export const Header: FunctionComponent = () => {
  const isSignedIn = useIsSignedIn();

  return (
    <div>
      <nav>
        <Link to="/">Flashcard</Link>
        <Link to="/flashcard-create">新規作成</Link>

        {isSignedIn && (
          <button type="button" onClick={() => signOut()}>
            ログアウト
          </button>
        )}
      </nav>
    </div>
  );
};
