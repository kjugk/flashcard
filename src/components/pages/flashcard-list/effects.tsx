import { FlashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { Dispatch } from "react";
import { FlashcardListPageAction } from "./store";
import { getCognitoIdToken } from "../../../lib/cognito";

const repository = new FlashcardRepository();

export const getFlashcards = async (
  dispatch: Dispatch<FlashcardListPageAction>
) => {
  console.log(await getCognitoIdToken());

  dispatch({
    type: "update-loading",
    payload: true,
  });

  // TODO 共通エラー処理(グローバルエラー的なstore 作る???)
  const list = await repository.getAll();

  dispatch({
    type: "store-flashcards",
    payload: list,
  });
};
