// システム関連の global state を管理する
import React, { createContext, useContext, Dispatch } from "react";
import { SystemState, SystemAction, useSystemReducer } from "./system.store";

interface IContextProps {
  systemState: SystemState;
  systemDispatch: Dispatch<SystemAction>;
}
const SystemContext = createContext({} as IContextProps);

export const SystemProvider: React.FunctionComponent = (props) => {
  const [systemState, systemDispatch] = useSystemReducer();

  return (
    <SystemContext.Provider
      value={{
        systemState,
        systemDispatch,
      }}
    >
      {props.children}
    </SystemContext.Provider>
  );
};

// custome hooks
export const useSystemContext = () => useContext(SystemContext);
