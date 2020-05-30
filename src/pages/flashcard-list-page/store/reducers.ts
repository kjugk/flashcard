import {
  FlashcardListPageActionTypes,
  FlashcardListPageState,
  STORE_FLASHCARDS,
} from "./types";

const initialState: FlashcardListPageState = {
  initialized: false,
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
        initialized: true,
        flashcards: [...state.flashcards, ...action.payload],
      };
    default:
      return state;
  }
}
