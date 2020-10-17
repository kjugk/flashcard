import { useReducer } from "react";
import { GetFlashcardResponse } from "../../../repositories/flashcard/response";

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
  type: "flashcard-detail/receive-flashcard-detail";
  payload: GetFlashcardResponse;
};

// Reducer
export function reducer(
  state: FlashcardDetailPageState,
  action: FlashcardDetailPageAction
): FlashcardDetailPageState {
  switch (action.type) {
    case "flashcard-detail/receive-flashcard-detail":
      const { flashcard } = action.payload;
      return {
        ...state,
        flashcard: {
          id: flashcard.id,
          name: flashcard.name,
          description: flashcard.description,
          qaList: flashcard.qaList,
        },
      };

    default:
      return state;
  }
}

export const useDetailPageReducer = () => useReducer(reducer, initialState);
