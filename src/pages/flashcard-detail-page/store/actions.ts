import {
  FlashcardDetailPageActionTypes,
  STORE_FLASHCARD_DETAIL,
} from "./types";

import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

export function storeFlashcardDetail(
  item: FlashcardDetail
): FlashcardDetailPageActionTypes {
  return {
    type: STORE_FLASHCARD_DETAIL,
    payload: item,
  };
}
