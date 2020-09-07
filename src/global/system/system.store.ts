// システム関連の global state を管理する
import { useReducer, useMemo } from "react";

type MessageType = "info" | "error";

// actions
export type SystemAction =
  | { type: "cleanup-message" }
  | {
      type: "set-system-message";
      payload: {
        message: string;
        messageType: MessageType;
      };
    }
  | { type: "update-loading"; payload: boolean };

// State types
export interface SystemState {
  message: string;
  messageType: MessageType;
  loading: boolean;
}

const initialState: SystemState = {
  message: "",
  messageType: "info",
  loading: false,
};

// reducer
function reducer(state: SystemState, action: SystemAction): SystemState {
  switch (action.type) {
    case "cleanup-message":
      return {
        ...state,
        message: "",
        messageType: "info",
      };

    case "set-system-message":
      return {
        ...state,
        ...action.payload,
      };

    case "update-loading":
      return {
        ...state,
        loading: action.payload,
      };
  }
}

// custome hooks
export const useSystemReducer = () => useReducer(reducer, initialState);

// selectors
export const useHasAnyMessage = (state: SystemState) => {
  return useMemo(() => state.message !== "", [state]);
};
