import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const TopPage: FunctionComponent = () => {
  return (
    <div>
      <h1>Flashcard</h1>
      <Link to="/sign-in">ログイン</Link>
    </div>
  );
};
