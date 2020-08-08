import React, { FunctionComponent } from "react";
import { signInWithGoogle, signOut } from "../../shared/lib/cognito";
import { SystemMessage } from "../../shared/components/system-message";

export const SignInPage: FunctionComponent = () => {
  return (
    <div>
      <h1>ログイン</h1>

      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
      <button onClick={() => signOut()}>サインアウト</button>
      <SystemMessage />
    </div>
  );
};
