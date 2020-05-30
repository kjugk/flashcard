// State types
export interface Flashcard {
  id: string;
  name: string;
}
export interface FlashcardListPageState {
  initialized: boolean;
  flashcards: Flashcard[];
}

// Action types
export const STORE_FLASHCARDS = "STORE_FLASHCARDS";
interface StoreFlashcardsAction {
  type: typeof STORE_FLASHCARDS;
  payload: Flashcard[];
}

export type FlashcardListPageActionTypes = StoreFlashcardsAction;
