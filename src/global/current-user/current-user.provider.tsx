import React, { createContext, useEffect, useContext, Dispatch } from "react";
import {
  useCurrentUserReducer,
  CurrentUserState,
  CurrentUserAction,
} from "./current-user.store";
import { getCognitoUser } from "../../lib/cognito";

// context
const CurrentUserContext = createContext(
  {} as {
    currentUserState: CurrentUserState;
    currentUserDispatch: Dispatch<CurrentUserAction>;
  }
);

// provider
export const CurrentUserProvider: React.FunctionComponent = (props) => {
  const [currentUserState, currentUserDispatch] = useCurrentUserReducer();

  const dispatchSignInAction = (name: string, picture: string) => {
    currentUserDispatch({
      type: "sign-in",
      payload: { name, picture },
    });
  };

  // ログインユーザーを取得する。
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

          result.forEach((r) => {
            if (r.getName() === "name") {
              name = r.getValue();
            }
            if (r.getName() === "picture") {
              picture = r.getValue();
            }
          });

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
