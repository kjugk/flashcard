import React, { FunctionComponent } from "react";
import { Flashcard } from "../store/types";

interface Props {
  items: Flashcard[];
}

export const FlashcardList: FunctionComponent<Props> = (props) => {
  return (
    <ul>
      {props.items.map((item, i) => (
        <li key={i}>{item.name}</li>
      ))}
    </ul>
  );
};
