import { createReducer } from "@reduxjs/toolkit";
import { updateLoading, storeFlashcards, notifyListIsDirty } from "./actions";
import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

// State types
export interface FlashcardListPageState {
  isDirty: boolean;
  isLoading: boolean;
  flashcards: FlashcardListItem[];
}

const initialState: FlashcardListPageState = {
  isLoading: false,
  isDirty: true,
  flashcards: [],
};

export const flashcardListPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(updateLoading, (state, action) => {
        state.isLoading = action.payload;
      })
      .addCase(notifyListIsDirty, (state, action) => {
        state.isDirty = action.payload;
      })
      .addCase(storeFlashcards, (state, action) => {
        state.isDirty = false;
        state.flashcards = action.payload;
      });
  }
);
