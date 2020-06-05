import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

interface Props {
  isLoading: boolean;
  items: FlashcardListItem[];
}

export const FlashcardList: FunctionComponent<Props> = (props) => {
  if (props.isLoading) {
    return <div>Loading...</div>;
  }

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
