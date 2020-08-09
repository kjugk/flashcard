import React, { FunctionComponent } from "react";
import { signInWithGoogle, signOut } from "../../shared/lib/cognito";
import { SystemMessage } from "../../shared/components/system-message";
import { useSignedInUserGuard } from "../../shared/providers/current-user";

export const SignInPage: FunctionComponent = () => {
  useSignedInUserGuard();

  return (
    <div>
      <h1>ログイン</h1>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
      <button onClick={() => signOut()}>サインアウト</button>
      <SystemMessage />
    </div>
  );
};
