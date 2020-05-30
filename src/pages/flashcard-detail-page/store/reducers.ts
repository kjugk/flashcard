import {
  FlashcardDetailPageState,
  FlashcardDetailPageActionTypes,
  STORE_FLASHCARD_DETAIL,
} from "./types";

const initialState: FlashcardDetailPageState = {
  flashcard: undefined,
};

export function flashcardDetailPageReducer(
  state = initialState,
  action: FlashcardDetailPageActionTypes
): FlashcardDetailPageState {
  switch (action.type) {
    case STORE_FLASHCARD_DETAIL:
      return {
        ...state,
        flashcard: action.payload,
      };
    default:
      return state;
  }
}
