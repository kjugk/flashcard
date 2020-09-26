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

export interface FlashcardDetailPageState {
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
): FlashcardDetailPageState {
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

export const useDetailPageReducer = () => useReducer(reducer, initialState);
