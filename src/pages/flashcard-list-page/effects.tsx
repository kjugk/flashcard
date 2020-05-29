import { AnyAction } from "redux";
import { storeFlashcards } from "./store/actions";
import { RootState } from "../../store/rootReducer";
import { ThunkAction } from "redux-thunk";
import { Flashcard } from "./store/types";

export const getFlashcards = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const dummyCards: Flashcard[] = [{ name: "First" }, { name: "Second" }];
    dispatch(storeFlashcards(dummyCards));
  };
};
