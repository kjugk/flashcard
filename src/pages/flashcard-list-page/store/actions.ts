import {
  STORE_FLASHCARDS,
  NOTIFY_LIST_IS_DIRTY,
  FlashcardListPageActionTypes,
} from "./types";
import { FlashcardListItem } from "../../../shared/types/flashcard-list-item";

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
