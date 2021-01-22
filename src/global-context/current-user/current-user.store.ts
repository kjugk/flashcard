// カレントユーザー関連の global state を管理する
import { useReducer, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUserContext } from "./current-user.provider";

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
export interface CurrentUserState {
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

    default:
      return state;
  }
}

export const useCurrentUserReducer = () => useReducer(reducer, initialState);

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
  }, [isSignedIn]);
};
