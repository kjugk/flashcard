// システム関連の global state を管理する

import React, { createContext, useReducer, useContext, Dispatch } from "react";

// actions
export type SystemAction = { type: "set-system-info-message"; payload: string };

// State types
interface SystemState {
  infoMessage: string;
}
const initialState: SystemState = {
  infoMessage: "",
};

// reducer
function reducer(state: SystemState, action: SystemAction): SystemState {
  switch (action.type) {
    case "set-system-info-message":
      return {
        ...state,
        infoMessage: action.payload,
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

export const useSystemContext = () => useContext(SystemContext);
