import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FlashcardListItem } from "../../../../types/flashcard-list-item";

interface Props {
  items: FlashcardListItem[];
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
