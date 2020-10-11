import { useReducer } from "react";

// State
export interface QaState {
  question: string;
  answer: string;
}

export interface FlashcardDetailState {
  id: string;
  name: string;
  description: string;
  qaList: QaState[];
}

export interface FlashcardDetailPageState {
  flashcard?: FlashcardDetailState;
}

export const initialState: FlashcardDetailPageState = {
  flashcard: undefined,
};

// Actions
export type FlashcardDetailPageAction = {
  type: "store-flashcard-detail";
  payload: FlashcardDetailState;
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
