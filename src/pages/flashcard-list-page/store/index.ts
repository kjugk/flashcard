import { useReducer } from "react";
import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

// actions
export type FlashcardListPageAction =
  | { type: "update-loading"; payload: boolean }
  | { type: "store-flashcards"; payload: FlashcardListItem[] }
  | { type: "update-list-is-dirty"; payload: boolean };

// State types
interface FlashcardListPageState {
  isDirty: boolean;
  isLoading: boolean;
  flashcards: FlashcardListItem[];
}

const initialState: FlashcardListPageState = {
  isLoading: false,
  isDirty: true,
  flashcards: [],
};

// reducer
function reducer(
  state: FlashcardListPageState,
  action: FlashcardListPageAction
): FlashcardListPageState {
  switch (action.type) {
    case "update-loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "store-flashcards":
      return {
        ...state,
        flashcards: action.payload,
        isLoading: false,
        isDirty: false,
      };

    case "update-list-is-dirty":
      return {
        ...state,
        isDirty: action.payload,
      };
  }
}

export const useListPageReducer = () => useReducer(reducer, initialState);
