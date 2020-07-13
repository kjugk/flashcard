import { FlashcardRepository } from "../../repositories/flashcard/flashcard-repository";
import { IFlashcardCreateForm } from "./types";
import { Dispatch } from "react";
import { FlashcardListPageAction } from "../flashcard-list-page/store";
const repository = new FlashcardRepository();

export const createFlashcard = async (
  form: IFlashcardCreateForm,
  dispatch: Dispatch<FlashcardListPageAction>
): Promise<string> => {
  // TODO 共通エラー処理
  const id = await repository.create(form);

  dispatch({
    type: "update-list-is-dirty",
    payload: true,
  });

  return id;
};
