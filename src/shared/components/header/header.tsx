import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const Header: FunctionComponent = () => {
  return (
    <div>
      <nav>
        <Link to="/">Flashcard</Link>
        <Link to="/flashcard-create">new</Link>
      </nav>
    </div>
  );
};
