import {
  FlashcardListPageActionTypes,
  FlashcardListPageState,
  STORE_FLASHCARDS,
  NOTIFY_LIST_IS_DIRTY,
} from "./types";

const initialState: FlashcardListPageState = {
  isDirty: true,
  flashcards: [],
};

export function flashcardListPageReducer(
  state = initialState,
  action: FlashcardListPageActionTypes
): FlashcardListPageState {
  switch (action.type) {
    case NOTIFY_LIST_IS_DIRTY:
      return {
        ...state,
        isDirty: action.payload,
      };
    case STORE_FLASHCARDS:
      return {
        ...state,
        isDirty: false,
        flashcards: action.payload,
      };
    default:
      return state;
  }
}
