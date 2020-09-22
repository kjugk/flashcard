import { useReducer } from "react";
import { shuffle, generateSequentialNumberList } from "../../../../lib/util";

// State
export interface Qa {
  question: string;
  answer: string;
}

export interface FlashcardDetail {
  id: string;
  name: string;
  description: string;
  qaList: Qa[];
}

// TODO viewer の state と分離する
export interface FlashcardDetailPageState {
  flashcard?: FlashcardDetail;
  currentPage: number;
  qaIndexList: number[];
  showEndOfQa: boolean;
  shuffling: boolean;
  showAnswer: boolean;
}

export const initialState: FlashcardDetailPageState = {
  flashcard: undefined,
  currentPage: 1,
  qaIndexList: [],
  showEndOfQa: false,
  shuffling: false,
  showAnswer: false,
};

type QuestionAnswer = "question" | "answer";

// Actions
export type FlashcardDetailPageAction =
  | {
      type: "store-flashcard-detail";
      payload: FlashcardDetail;
    }
  | {
      type: "show-next-page";
    }
  | {
      type: "show-prev-page";
    }
  | {
      type: "restart-qa";
    }
  | {
      type: "flip-qa";
      payload: QuestionAnswer;
    }
  | {
      type: "toggle-shuffle";
      payload: boolean;
    };

// Reducer
export function reducer(
  state: FlashcardDetailPageState,
  action: FlashcardDetailPageAction
): FlashcardDetailPageState {
  switch (action.type) {
    case "store-flashcard-detail":
      return {
        ...state,
        flashcard: action.payload,
        qaIndexList: generateSequentialNumberList(action.payload.qaList.length),
      };

    case "show-next-page":
      if (state.currentPage === state.qaIndexList.length) {
        return {
          ...state,
          showEndOfQa: true,
        };
      }

      return {
        ...state,
        currentPage: state.currentPage + 1,
        showAnswer: false,
      };

    case "show-prev-page":
      if (state.currentPage <= 1) return state;

      return {
        ...state,
        currentPage: state.currentPage - 1,
        showEndOfQa: false,
        showAnswer: false,
      };

    case "flip-qa":
      return {
        ...state,
        showAnswer: action.payload === "answer",
      };

    case "restart-qa":
      return {
        ...state,
        currentPage: 1,
        showEndOfQa: false,
        showAnswer: false,
      };

    case "toggle-shuffle":
      return {
        ...state,
        qaIndexList: action.payload
          ? shuffle(state.qaIndexList)
          : generateSequentialNumberList(state.qaIndexList.length),
        shuffling: action.payload,
        currentPage: 1,
        showEndOfQa: false,
        showAnswer: false,
      };

    default:
      return state;
  }
}

export const useDetailPageReducer = () => useReducer(reducer, initialState);

// selectors
export const useCurrentQa = (state: FlashcardDetailPageState) => {
  const { flashcard, qaIndexList, currentPage } = state;

  if (flashcard === undefined) return undefined;

  return flashcard.qaList[qaIndexList[currentPage - 1]];
};
