// システム関連の global state を管理する
import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useMemo,
} from "react";

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
interface SystemState {
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

interface IContextProps {
  systemState: SystemState;
  systemDispatch: Dispatch<SystemAction>;
}
const SystemContext = createContext({} as IContextProps);

export const SystemProvider: React.FunctionComponent = (props) => {
  const [systemState, systemDispatch] = useReducer(reducer, initialState);

  return (
    <SystemContext.Provider value={{ systemState, systemDispatch }}>
      {props.children}
    </SystemContext.Provider>
  );
};

// custome hooks
export const useSystemContext = () => useContext(SystemContext);
export const useHasAnyMessage = (state: SystemState) => {
  return useMemo(() => state.message !== "", [state]);
};
