import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

export type Action =
  | { type: "update-loading"; payload: boolean }
  | { type: "store-flashcard-detail"; payload: FlashcardDetail };
