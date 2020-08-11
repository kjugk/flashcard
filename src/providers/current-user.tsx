// カレントユーザー関連の global state を管理する
import { getCognitoUser } from "../lib/cognito";

import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
  useMemo,
} from "react";
import { useHistory } from "react-router-dom";

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

// custom hooks
export const useIsSignedIn = () => {
  const { currentUserState } = useCurrentUserContext();
  return useMemo(
    () => currentUserState.initialized && currentUserState.name !== "",
    [currentUserState.initialized, currentUserState.name]
  );
};

export const useSignedInUserGuard = () => {
  const isSignedIn = useIsSignedIn();
  const history = useHistory();

  useEffect(() => {
    if (isSignedIn) {
      history.push("/flashcard-list");
    }
  }, [isSignedIn, history]);
};

// provider
const CurrentUserContext = createContext(
  {} as {
    currentUserState: CurrentUserState;
    currentUserDispatch: Dispatch<CurrentUserAction>;
  }
);

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

  // 初回ログインユーザーを取得する。
  // cognito の API を隠蔽したほうが良いかも
  useEffect(() => {
    let [name, picture] = ["", ""];

    getCognitoUser()
      .then((user) => {
        if (user === undefined) {
          dispatchSignInAction(name, picture);
          return;
        }

        user.getUserAttributes((err, result) => {
          if (err) {
            dispatchSignInAction(name, picture);
            return;
          }
          if (result === undefined) {
            dispatchSignInAction(name, picture);
            return;
          }

          name = result.find((r) => r.getName() === "name")?.getValue() ?? "";
          picture =
            result.find((r) => r.getName() === "picture")?.getValue() ?? "";

          dispatchSignInAction(name, picture);
        });
      })
      .catch(() => {
        dispatchSignInAction(name, picture);
      });
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
