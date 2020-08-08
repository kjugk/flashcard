/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_API_BASE_URL: string;
    REACT_APP_REDIRECT_SIGN_IN: string;
    REACT_APP_REDIRECT_SIGN_OUT: string;
    REACT_APP_OAUTH_DOMAIN: string;
    REACT_APP_COGNITO_USER_POOL_ID: string;
    REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID: string;
  }
}
