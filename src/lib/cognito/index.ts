import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";

/**
 * Aws cognito をセットアップする。
 */
export function configureCognito() {
  Amplify.configure({
    Auth: {
      region: "ap-northeast-1",
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId:
        process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
      oauth: {
        domain: process.env.REACT_APP_OAUTH_DOMAIN,
        scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
        redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
        redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
        responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
      },
    },
  });
}

export const signInWithGoogle = () => {
  Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  });
};

export const getCognitoUser = async () => {
  const user: CognitoUser | undefined = await Auth.currentAuthenticatedUser();
  return user;
};

export const signOut = () => {
  Auth.signOut();
};

export const getCognitoIdToken = () => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const user = await getCognitoUser();
      if (user === undefined) {
        throw new Error("User is not signed in.");
      }

      const session = await Auth.currentSession();
      user.refreshSession(
        session.getRefreshToken(),
        (err, session: CognitoUserSession) => {
          if (err) {
            throw new Error("User is not signed in.");
          }
          resolve(session.getAccessToken().getJwtToken());
        }
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
