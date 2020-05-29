import { FlashcardListPageActionTypes, FlashcardListPageState, STORE_FLASHCARDS } from "./types";

const initialState: FlashcardListPageState = {
  flashcards: [],
};

export function flashcardListPageReducer(
  state = initialState,
  action: FlashcardListPageActionTypes
): FlashcardListPageState {
  switch (action.type) {
    case STORE_FLASHCARDS:
      return {
        ...state,
        flashcards: [...state.flashcards, ...action.payload],
      };
    default:
      return state;
  }
}
