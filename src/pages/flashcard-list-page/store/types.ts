// State types
export interface Flashcard {
  name: string;
}

export interface FlashcardListPageState {
  flashcards: Flashcard[];
}

// Action types
export const STORE_FLASHCARDS = "STORE_FLASHCARDS";
interface StoreFlashcardsAction {
  type: typeof STORE_FLASHCARDS;
  payload: Flashcard[];
}

export type FlashcardListPageActionTypes = StoreFlashcardsAction;
