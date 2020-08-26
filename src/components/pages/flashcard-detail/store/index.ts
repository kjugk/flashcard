import { FlashcardDetail } from "../../../../types/flashcard-detail";
import { useReducer } from "react";

// Actions
export type FlashcardDetailPageAction = {
  type: "store-flashcard-detail";
  payload: FlashcardDetail;
};

// State
interface FlashcardDetailPageState {
  flashcard?: FlashcardDetail;
}

export const initialState: FlashcardDetailPageState = {
  flashcard: undefined,
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
