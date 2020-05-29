import {
  STORE_FLASHCARDS,
  FlashcardListPageActionTypes,
  Flashcard,
} from "./types";

export function storeFlashcards(
  items: Flashcard[]
): FlashcardListPageActionTypes {
  return {
    type: STORE_FLASHCARDS,
    payload: items,
  };
}
