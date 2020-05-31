import { STORE_FLASHCARDS, FlashcardListPageActionTypes } from "./types";

import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

export function storeFlashcards(
  items: FlashcardListItem[]
): FlashcardListPageActionTypes {
  return {
    type: STORE_FLASHCARDS,
    payload: items,
  };
}
