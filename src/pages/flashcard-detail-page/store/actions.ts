import {
  FlashcardDetailPageActionTypes,
  UPDATE_LOADING,
  STORE_FLASHCARD_DETAIL,
} from "./types";

import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

export function updateLoading(
  loading: boolean
): FlashcardDetailPageActionTypes {
  return {
    type: UPDATE_LOADING,
    payload: loading,
  };
}
export function storeFlashcardDetail(
  item: FlashcardDetail
): FlashcardDetailPageActionTypes {
  return {
    type: STORE_FLASHCARD_DETAIL,
    payload: item,
  };
}
