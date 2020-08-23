import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useSignedInUserGuard } from "../../../global/store/current-user.store";
import { useCurrentUserContext } from "../../../global/provider/current-user.provider";

export const TopPage: FunctionComponent = () => {
  const { currentUserState } = useCurrentUserContext();
  useSignedInUserGuard(currentUserState);

  return (
    <div>
      <h1>Flashcard</h1>
      <Link to="/sign-in">ログイン</Link>
    </div>
  );
};
