import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

// State types
export interface FlashcardListPageState {
  isDirty: boolean;
  isLoading: boolean;
  flashcards: FlashcardListItem[];
}

// Action types
export const UPDATE_LOADING = "UPDATE_LOADING";
export const NOTIFY_LIST_IS_DIRTY = "NOTIFY_LIST_IS_DIRTY";
export const STORE_FLASHCARDS = "STORE_FLASHCARDS";

interface UpdateLoadingAction {
  type: typeof UPDATE_LOADING;
  payload: boolean;
}

interface NotifyListIsDirtyAction {
  type: typeof NOTIFY_LIST_IS_DIRTY;
  payload: true;
}

interface StoreFlashcardsAction {
  type: typeof STORE_FLASHCARDS;
  payload: FlashcardListItem[];
}

export type FlashcardListPageActionTypes =
  | UpdateLoadingAction
  | NotifyListIsDirtyAction
  | StoreFlashcardsAction;
