// カレントユーザー関連のstate を管理する
import { getCognitoUser } from "../lib/cognito";

import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
  useMemo,
} from "react";

// actions
export type CurrentUserAction =
  | {
      type: "sign-in";
      payload: { name: string; picture: string };
    }
  | {
      type: "sign-out";
    };

// state
interface CurrentUserState {
  initialized: boolean;
  name: string;
  picture: string;
}
const initialState: CurrentUserState = {
  initialized: false,
  name: "",
  picture: "",
};

// reducer
function reducer(
  state: CurrentUserState,
  action: CurrentUserAction
): CurrentUserState {
  switch (action.type) {
    case "sign-in":
      return {
        ...state,
        initialized: true,
        ...action.payload,
      };
    case "sign-out":
      return {
        ...state,
        name: "",
        picture: "",
      };
  }
}

interface IContextProps {
  currentUserState: CurrentUserState;
  currentUserDispatch: Dispatch<CurrentUserAction>;
}
const CurrentUserContext = createContext({} as IContextProps);

export const CurrentUserProvider: React.FunctionComponent = (props) => {
  const [currentUserState, currentUserDispatch] = useReducer(
    reducer,
    initialState
  );

  const dispatchSignInAction = (name: string, picture: string) => {
    currentUserDispatch({
      type: "sign-in",
      payload: { name, picture },
    });
  };

  useEffect(() => {
    // cognito の API を隠蔽したほうが良いかも
    const getUser = async () => {
      let [name, picture] = ["", ""];

      try {
        const user = await getCognitoUser();
        if (user === undefined) {
          dispatchSignInAction(name, picture);
          return;
        }

        user.getUserAttributes((err, result) => {
          if (err || result === undefined) {
            dispatchSignInAction(name, picture);
            return;
          }

          name = result.find((r) => r.getName() === "name")?.getValue() ?? "";
          picture =
            result.find((r) => r.getName() === "picture")?.getValue() ?? "";

          dispatchSignInAction(name, picture);
        });
      } catch (e) {
        return dispatchSignInAction(name, picture);
      }
    };

    getUser();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserState,
        currentUserDispatch,
      }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);

// custom hooks
export const useIsSignedIn = () => {
  const { currentUserState } = useCurrentUserContext();
  return useMemo(
    () => currentUserState.initialized && currentUserState.name !== "",
    [currentUserState.initialized, currentUserState.name]
  );
};
