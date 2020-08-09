import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useSignedInUserGuard } from "../../shared/providers/current-user";

export const TopPage: FunctionComponent = () => {
  useSignedInUserGuard();

  return (
    <div>
      <h1>Flashcard</h1>
      <Link to="/sign-in">ログイン</Link>
    </div>
  );
};
