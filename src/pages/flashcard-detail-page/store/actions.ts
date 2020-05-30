import {
  FlashcardDetail,
  FlashcardDetailPageActionTypes,
  STORE_FLASHCARD_DETAIL,
} from "./types";

export function storeFlashcardDetail(
  item: FlashcardDetail
): FlashcardDetailPageActionTypes {
  return {
    type: STORE_FLASHCARD_DETAIL,
    payload: item,
  };
}
