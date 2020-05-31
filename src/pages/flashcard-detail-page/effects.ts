import { AnyAction } from "redux";
import { storeFlashcardDetail } from "./store/actions";
import { RootState } from "../../store/root-reducer";
import { ThunkAction } from "redux-thunk";
import { FlashcardRepository } from "../../repositories/flashcard-repository";

const repository = new FlashcardRepository();

export const getFlashcardDetail = (
  id: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const item = await repository.find(id);
    dispatch(storeFlashcardDetail(item));
  };
};
