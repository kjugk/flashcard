// システム関連の global state を管理する
import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useMemo,
} from "react";

// actions
// TODO action 一つにまとめて、messageTYpe にする
export type SystemAction =
  | { type: "set-system-info-message"; payload: string }
  | { type: "set-system-error-message"; payload: string };

// State types
interface SystemState {
  infoMessage: string;
  errorMessage: string;
}
const initialState: SystemState = {
  infoMessage: "",
  errorMessage: "",
};

// reducer
function reducer(state: SystemState, action: SystemAction): SystemState {
  switch (action.type) {
    case "set-system-info-message":
      return {
        ...state,
        infoMessage: action.payload,
      };
    case "set-system-error-message":
      return {
        ...state,
        errorMessage: action.payload,
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
  return useMemo(() => state.infoMessage !== "" || state.errorMessage !== "", [
    state,
  ]);
};
