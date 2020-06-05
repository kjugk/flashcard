import { createAction } from "@reduxjs/toolkit";
import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

export const updateLoading = createAction<boolean>(
  "flashcard-list/update-loading"
);
export const storeFlashcards = createAction<FlashcardListItem[]>(
  "flashcard-list/store-flashcards"
);
export const notifyListIsDirty = createAction<true>(
  "flashcard-list/notify-list-is-dirty"
);
