import React, { FunctionComponent } from "react";
import { signInWithGoogle } from "../../../lib/cognito";
import { SystemMessage } from "../../shared/system-message";
import { useSignedInUserGuard } from "../../../global/store/current-user.store";
import { useCurrentUserContext } from "../../../global/provider/current-user.provider";

export const SignInPage: FunctionComponent = () => {
  const { currentUserState } = useCurrentUserContext();
  useSignedInUserGuard(currentUserState);

  return (
    <div>
      <h1>ログイン</h1>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
      <SystemMessage />
    </div>
  );
};
