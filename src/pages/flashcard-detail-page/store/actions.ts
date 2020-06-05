import { createAction } from "@reduxjs/toolkit";
import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

export const updateLoading = createAction<boolean>(
  "flashcrd-detail/update-loading"
);

export const storeFlashcardDetail = createAction<FlashcardDetail>(
  "flashcard-detail/store-flashcard-detail"
);
