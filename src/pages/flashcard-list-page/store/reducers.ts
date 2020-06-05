import {
  FlashcardListPageActionTypes,
  FlashcardListPageState,
  UPDATE_LOADING,
  NOTIFY_LIST_IS_DIRTY,
  STORE_FLASHCARDS,
} from "./types";

const initialState: FlashcardListPageState = {
  isLoading: false,
  isDirty: true,
  flashcards: [],
};

export function flashcardListPageReducer(
  state = initialState,
  action: FlashcardListPageActionTypes
): FlashcardListPageState {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
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
