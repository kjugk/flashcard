import {
  FlashcardDetailPageState,
  FlashcardDetailPageActionTypes,
  STORE_FLASHCARD_DETAIL,
  UPDATE_LOADING,
} from "./types";

const initialState: FlashcardDetailPageState = {
  isLoading: false,
  flashcard: undefined,
};

export function flashcardDetailPageReducer(
  state = initialState,
  action: FlashcardDetailPageActionTypes
): FlashcardDetailPageState {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case STORE_FLASHCARD_DETAIL:
      return {
        ...state,
        flashcard: action.payload,
      };
    default:
      return state;
  }
}
