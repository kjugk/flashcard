import { useReducer } from "react";

// actions
export type FlashcardListPageAction = {
  type: "store-flashcards";
  payload: FlashcardListItemState[];
};

// State types
export interface FlashcardListItemState {
  id: string;
  name: string;
  description: string;
  createdAt: number;
}

interface FlashcardListPageState {
  flashcards: FlashcardListItemState[];
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
