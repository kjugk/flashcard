import React, { FunctionComponent } from "react";
import { Flashcard } from "../store/types";
import { Link } from "react-router-dom";

interface Props {
  items: Flashcard[];
}

export const FlashcardList: FunctionComponent<Props> = (props) => {
  return (
    <ul>
      {props.items.map((item, i) => (
        <li key={i}>
          <Link to={`/flashcard-detail/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};
