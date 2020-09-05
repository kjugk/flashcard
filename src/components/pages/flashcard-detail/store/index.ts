import { useReducer } from "react";

// State

export interface Qa {
  question: string;
  answer: string;
}

export interface FlashcardDetail {
  id: string;
  name: string;
  description: string;
  qaList: Qa[];
}

interface FlashcardDetailPageState {
  flashcard?: FlashcardDetail;
}

export const initialState: FlashcardDetailPageState = {
  flashcard: undefined,
};

// Actions
export type FlashcardDetailPageAction = {
  type: "store-flashcard-detail";
  payload: FlashcardDetail;
};

// Reducer
export function reducer(
  state: FlashcardDetailPageState,
  action: FlashcardDetailPageAction
) {
  switch (action.type) {
    case "store-flashcard-detail":
      return {
        ...state,
        flashcard: action.payload,
      };
    default:
      return state;
  }
}

// custom hooks
export const useDetailPageReducer = () => useReducer(reducer, initialState);
