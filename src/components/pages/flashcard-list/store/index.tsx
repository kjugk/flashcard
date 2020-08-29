import { useReducer } from "react";

// actions
export type FlashcardListPageAction = {
  type: "store-flashcards";
  payload: FlashcardListItem[];
};

// State types
export interface FlashcardListItem {
  id: string;
  name: string;
  description: string;
}

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
