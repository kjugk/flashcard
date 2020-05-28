import { STORE_FLASHCARDS, FlashcardListPageActionTypes } from "./types";

export function getFlashcards(): FlashcardListPageActionTypes {
  // TODO insert redux thunk
  return {
    type: STORE_FLASHCARDS,
    payload: [{ name: "my first card!!!" }],
  };
}
