import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { Dispatch } from "react";
import { FlashcardListPageAction } from "./store";

export const getFlashcards = async (
  dispatch: Dispatch<FlashcardListPageAction>
) => {
  dispatch({
    type: "update-loading",
    payload: true,
  });

  const list = await flashcardRepository.getAll();
  dispatch({
    type: "store-flashcards",
    payload: list,
  });
};
