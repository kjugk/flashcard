import { useReducer } from "react";
import { GetFlashcardListResponse } from "../../repositories/flashcard/response";

// actions
export type FlashcardListPageAction =
  | {
      type: "flashcard-list/recieve-flashcards";
      payload: GetFlashcardListResponse;
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
    case "flashcard-list/recieve-flashcards":
      const { flashcards } = action.payload;
      return {
        ...state,
        flashcards: flashcards.map((f) => {
          return {
            id: f.id,
            name: f.name,
            description: f.description,
            createdAt: f.createdAt,
          };
        }),
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
