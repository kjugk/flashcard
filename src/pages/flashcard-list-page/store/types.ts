import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

// State types
export interface FlashcardListPageState {
  isDirty: boolean;
  flashcards: FlashcardListItem[];
}

// Action types
export const STORE_FLASHCARDS = "STORE_FLASHCARDS";
export const NOTIFY_LIST_IS_DIRTY = "NOTIFY_LIST_IS_DIRTY";

interface StoreFlashcardsAction {
  type: typeof STORE_FLASHCARDS;
  payload: FlashcardListItem[];
}

interface NotifyListIsDirtyAction {
  type: typeof NOTIFY_LIST_IS_DIRTY;
  payload: true;
}

export type FlashcardListPageActionTypes =
  | StoreFlashcardsAction
  | NotifyListIsDirtyAction;
