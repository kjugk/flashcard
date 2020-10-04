// システム関連の global state を管理する
import { useReducer, useMemo } from "react";

type MessageType = "info" | "error";
type ErrorType = "notFound" | "network";

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
  | {
      type: "update-loading";
      payload: {
        loading: boolean;
        message?: string;
      };
    }
  | {
      type: "system/set-system-error";
      payload: ErrorType | undefined;
    };

// State types
export interface SystemState {
  message: string;
  messageType: MessageType;
  errorType: ErrorType | undefined;
  loading: boolean;
  loadingMessage: string;
}

const initialState: SystemState = {
  message: "",
  messageType: "info",
  errorType: undefined,
  loading: false,
  loadingMessage: "",
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
    case "system/set-system-error":
      return {
        ...state,
        errorType: action.payload,
      };
    case "update-loading":
      return {
        ...state,
        loading: action.payload.loading,
        loadingMessage: action.payload.message || "",
      };
  }
}

export const useSystemReducer = () => useReducer(reducer, initialState);

// selectors
export const useHasAnyMessage = (state: SystemState) => {
  return useMemo(() => state.message !== "", [state]);
};
