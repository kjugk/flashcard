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
    };

// State types
export interface SystemState {
  message: string;
  messageType: MessageType;
}

const initialState: SystemState = {
  message: "",
  messageType: "info",
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
  }
}

// custome hooks
export const useSystemReducer = () => useReducer(reducer, initialState);

// selectors
export const useHasAnyMessage = (state: SystemState) => {
  return useMemo(() => state.message !== "", [state]);
};
