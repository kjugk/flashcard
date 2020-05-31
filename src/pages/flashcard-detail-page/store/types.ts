import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

// State types
export interface FlashcardDetailPageState {
  flashcard?: FlashcardDetail;
}

// Action types
export const STORE_FLASHCARD_DETAIL = "STORE_FLASHCARD_DETAIL";
interface StoreFlashcardDetailAction {
  type: typeof STORE_FLASHCARD_DETAIL;
  payload: FlashcardDetail;
}

export type FlashcardDetailPageActionTypes = StoreFlashcardDetailAction;
