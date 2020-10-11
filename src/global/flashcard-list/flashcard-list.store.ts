import { useReducer } from "react";

// actions
export type FlashcardListPageAction =
  | {
      type: "store-flashcards";
      payload: FlashcardListItemState[];
    }
  | {
      type: "set-stale";
      payload: boolean;
    };

// State types
export interface FlashcardListItemState {
  id: string;
  name: string;
  description: string;
  createdAt: number;
}

export interface FlashcardListPageState {
  flashcards: FlashcardListItemState[];
  stale: boolean;
}

const initialState: FlashcardListPageState = {
  flashcards: [],
  stale: true,
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
        stale: false,
      };
    case "set-stale":
      return {
        ...state,
        stale: action.payload,
      };
    default:
      return state;
  }
}

// costome hooks
export const useListPageReducer = () => useReducer(reducer, initialState);
