import { FlashcardRepository } from "../../repositories/flashcard-repository";
import { Dispatch } from "react";
import { FlashcardListPageAction } from "./store";

const repository = new FlashcardRepository();

export const getFlashcards = async (
  dispatch: Dispatch<FlashcardListPageAction>
) => {
  // TODO 共通エラー処理
  dispatch({
    type: "update-loading",
    payload: true,
  });

  const list = await repository.getAll();
  dispatch({
    type: "store-flashcards",
    payload: list,
  });
};
