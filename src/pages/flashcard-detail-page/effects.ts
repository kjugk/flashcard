import { Dispatch } from "react";
import { FlashcardRepository } from "../../repositories/flashcard-repository";
import { Action } from "./store/actions";

const repository = new FlashcardRepository();

export const getFlashcardDetail = async (
  id: string,
  dispatch: Dispatch<Action>
) => {
  dispatch({
    type: "update-loading",
    payload: true,
  });

  const item = await repository.find(id);
  dispatch({
    type: "store-flashcard-detail",
    payload: item,
  });
};
