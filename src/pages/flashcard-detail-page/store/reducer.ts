import { FlashcardDetail } from "../../../shared/types/flashcard-detail";
import { Action } from "./actions";

interface FlashcardDetailPageState {
  isLoading: boolean;
  flashcard?: FlashcardDetail;
}

export const initialState: FlashcardDetailPageState = {
  isLoading: false,
  flashcard: undefined,
};

export function reducer(state: FlashcardDetailPageState, action: Action) {
  switch (action.type) {
    case "update-loading":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "store-flashcard-detail":
      return {
        ...state,
        isLoading: false,
        flashcard: action.payload,
      };

    default:
      throw new Error();
  }
}
