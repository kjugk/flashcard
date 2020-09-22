import { useReducer, useMemo } from "react";
import { shuffle, generateSequentialNumberList } from "../../../../lib/util";
import { Qa } from "../store";

export interface QaViewerState {
  qaList: Qa[];
  currentPage: number;
  qaIndexList: number[];
  showEndOfQa: boolean;
  shuffling: boolean;
  showAnswer: boolean;
}

export const initialState: QaViewerState = {
  qaList: [],
  currentPage: 1,
  qaIndexList: [],
  showEndOfQa: false,
  shuffling: false,
  showAnswer: false,
};

type QuestionAnswer = "question" | "answer";

// Actions
export type QaViewerAction =
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
  state: QaViewerState,
  action: QaViewerAction
): QaViewerState {
  switch (action.type) {
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

const init = (qaList: Qa[]): QaViewerState => {
  return {
    ...initialState,
    qaList: qaList,
    qaIndexList: generateSequentialNumberList(qaList.length),
  };
};

export const useQaViewerReducer = (qaList: Qa[]) =>
  useReducer(reducer, qaList, init);

// selectors
export const useCurrentQa = (state: QaViewerState) => {
  const { qaList, qaIndexList, currentPage } = state;

  return useMemo(() => {
    return qaList[qaIndexList[currentPage - 1]];
  }, [qaList, qaIndexList, currentPage]);
};
