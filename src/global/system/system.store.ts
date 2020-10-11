// システム関連の global state を管理する
import { useReducer } from "react";

type MessageType = "info" | "error";
type ErrorType = "notFound" | "network";

// actions
export type SystemAction =
  | {
      type: "system/set-system-message";
      payload: {
        message: string;
        messageType: MessageType;
      };
    }
  | {
      type: "system/hide-system-message";
    }
  | {
      type: "system/update-loading";
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
  showMessage: boolean;
  errorType: ErrorType | undefined;
  loading: boolean;
  loadingMessage: string;
}

const initialState: SystemState = {
  message: "",
  messageType: "info",
  showMessage: false,
  errorType: undefined,
  loading: false,
  loadingMessage: "",
};

// reducer
function reducer(state: SystemState, action: SystemAction): SystemState {
  switch (action.type) {
    case "system/set-system-message":
      return {
        ...state,
        ...action.payload,
        showMessage: true,
      };
    case "system/hide-system-message":
      return {
        ...state,
        messageType: "info",
        showMessage: false,
      };

    case "system/set-system-error":
      return {
        ...state,
        errorType: action.payload,
      };
    case "system/update-loading":
      return {
        ...state,
        loading: action.payload.loading,
        loadingMessage: action.payload.message || "",
      };
  }
}

export const useSystemReducer = () => useReducer(reducer, initialState);
