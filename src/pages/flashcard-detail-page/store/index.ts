import { FlashcardDetail } from "../../../shared/types/flashcard-detail";

// Actions
export type FlashcardDetailPageAction =
  | { type: "update-loading"; payload: boolean }
  | { type: "update-deleting"; payload: boolean }
  | { type: "store-flashcard-detail"; payload: FlashcardDetail };

// State
interface FlashcardDetailPageState {
  isLoading: boolean;
  isDeleting: boolean;
  flashcard?: FlashcardDetail;
}

export const initialState: FlashcardDetailPageState = {
  isLoading: false,
  isDeleting: false,
  flashcard: undefined,
};

// Reducer
export function reducer(
  state: FlashcardDetailPageState,
  action: FlashcardDetailPageAction
) {
  switch (action.type) {
    case "update-loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "update-deleting":
      return {
        ...state,
        isDeleting: action.payload,
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
