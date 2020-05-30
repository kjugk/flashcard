import { AnyAction } from "redux";
import { storeFlashcards } from "./store/actions";
import { RootState } from "../../store/root-reducer";
import { ThunkAction } from "redux-thunk";
import { Flashcard } from "./store/types";
import shortid from "shortid";

export const getFlashcards = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const { flashcardListPage } = getState();
    if (flashcardListPage.initialized) return;

    const dummyCards: Flashcard[] = [
      { id: shortid.generate(), name: "First" },
      { id: shortid.generate(), name: "Second" },
    ];
    dispatch(storeFlashcards(dummyCards));
  };
};
