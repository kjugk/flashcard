import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

// State types
export interface FlashcardListPageState {
  initialized: boolean;
  flashcards: FlashcardListItem[];
}

// Action types
export const STORE_FLASHCARDS = "STORE_FLASHCARDS";
interface StoreFlashcardsAction {
  type: typeof STORE_FLASHCARDS;
  payload: FlashcardListItem[];
}

export type FlashcardListPageActionTypes = StoreFlashcardsAction;
