// State types
export interface FlashcardDetail {
  id: string;
  name: string;
}

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
