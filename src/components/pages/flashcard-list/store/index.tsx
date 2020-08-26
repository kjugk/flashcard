import { useReducer } from "react";
import { FlashcardListItem } from "../../../../types/flashcard-list-item";

// actions
export type FlashcardListPageAction = {
  type: "store-flashcards";
  payload: FlashcardListItem[];
};

// State types
interface FlashcardListPageState {
  flashcards: FlashcardListItem[];
}

const initialState: FlashcardListPageState = {
  flashcards: [],
};

// reducer
function reducer(
  state: FlashcardListPageState,
  action: FlashcardListPageAction
): FlashcardListPageState {
  switch (action.type) {
    case "store-flashcards":
      return {
        ...state,
        flashcards: action.payload,
      };
    default:
      return state;
  }
}

// costome hooks
export const useListPageReducer = () => useReducer(reducer, initialState);
