import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

// State types
export interface FlashcardDetailPageState {
  isLoading: boolean;
  flashcard?: FlashcardDetail;
}

// Action types
export const UPDATE_LOADING = "UPDATE_LOADING";
export const STORE_FLASHCARD_DETAIL = "STORE_FLASHCARD_DETAIL";

interface UpdateLoadingAction {
  type: typeof UPDATE_LOADING;
  payload: boolean;
}

interface StoreFlashcardDetailAction {
  type: typeof STORE_FLASHCARD_DETAIL;
  payload: FlashcardDetail;
}

export type FlashcardDetailPageActionTypes =
  | StoreFlashcardDetailAction
  | UpdateLoadingAction;
