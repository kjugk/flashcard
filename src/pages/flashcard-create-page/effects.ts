import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/root-reducer";
import { FlashcardRepository } from "../../repositories/flashcard-repository";
import { IFlashcardCreateForm } from "./types";
import { notifyListIsDirty } from "../flashcard-list-page/store/actions";

const repository = new FlashcardRepository();

export const createFlashcard = (
  form: IFlashcardCreateForm
): ThunkAction<Promise<string>, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    // TODO 共通エラー処理
    const id = await repository.create(form);
    dispatch(notifyListIsDirty(true));
    return id;
  };
};
