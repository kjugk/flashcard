import { AnyAction } from "redux";
import { storeFlashcards } from "./store/actions";
import { RootState } from "../../store/root-reducer";
import { ThunkAction } from "redux-thunk";
import { FlashcardRepository } from "../../repositories/flashcard-repository";

const repository = new FlashcardRepository();

export const getFlashcards = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const { flashcardListPage } = getState();
    if (flashcardListPage.initialized) return;

    // TODO 共通エラー処理
    const items = await repository.getAll();
    dispatch(storeFlashcards(items));
  };
};
