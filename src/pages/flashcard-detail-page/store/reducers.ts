import { createReducer } from "@reduxjs/toolkit";
import { updateLoading, storeFlashcardDetail } from "./actions";
import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

// State types
export interface FlashcardDetailPageState {
  isLoading: boolean;
  flashcard?: FlashcardDetail;
}

const initialState: FlashcardDetailPageState = {
  isLoading: false,
  flashcard: undefined,
};

export const flashcardDetailPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(updateLoading, (state, action) => ({
        ...state,
        isLoading: action.payload,
      }))
      .addCase(storeFlashcardDetail, (state, action) => ({
        ...state,
        flashcard: action.payload,
      }));
  }
);
