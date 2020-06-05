import {
  STORE_FLASHCARDS,
  NOTIFY_LIST_IS_DIRTY,
  FlashcardListPageActionTypes,
  UPDATE_LOADING,
} from "./types";
import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

export function updateLoading(loading: boolean): FlashcardListPageActionTypes {
  return {
    type: UPDATE_LOADING,
    payload: loading,
  };
}

export function storeFlashcards(
  items: FlashcardListItem[]
): FlashcardListPageActionTypes {
  return {
    type: STORE_FLASHCARDS,
    payload: items,
  };
}

export function notifyListIsDirty(): FlashcardListPageActionTypes {
  return {
    type: NOTIFY_LIST_IS_DIRTY,
    payload: true,
  };
}
