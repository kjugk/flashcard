import {
  Flashcard,
  STORE_FLASHCARDS,
  FlashcardListPageActionTypes,
} from "./types";

export function storeFlashcards(
  flashcards: Flashcard[]
): FlashcardListPageActionTypes {
  return {
    type: STORE_FLASHCARDS,
    payload: flashcards,
  };
}
