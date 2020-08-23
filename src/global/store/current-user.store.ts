// カレントユーザー関連の global state を管理する
import { useReducer, useEffect, useMemo } from "react";
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
        initialized: true,
        name: "",
        picture: "",
      };
  }
}

// custom hooks
export const useCurrentUserReducer = () => useReducer(reducer, initialState);

// selectors
export const useIsSignedIn = (currentUserState: CurrentUserState) => {
  return useMemo(
    () => currentUserState.initialized && currentUserState.name !== "",
    [currentUserState.initialized, currentUserState.name]
  );
};

// TODO 置き場所決める(components/shared/hooks?)
export const useSignedInUserGuard = (currentUserState: CurrentUserState) => {
  const isSignedIn = useIsSignedIn(currentUserState);
  const history = useHistory();

  useEffect(() => {
    if (isSignedIn) {
      history.push("/flashcard-list");
    }
  }, [isSignedIn]);
};
