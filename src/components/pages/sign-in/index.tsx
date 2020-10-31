import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { signInWithGoogle } from "../../../lib/cognito";
import { useSignedInUserGuard } from "../../../global-context/current-user/current-user.store";
import { ClosableHeader } from "../../shared/closable-header";
import { Container } from "../../lib";
import { useHistory } from "react-router-dom";

export const SignInPage: FunctionComponent = () => {
  useSignedInUserGuard();
  const history = useHistory();

  return (
    <div>
      <ClosableHeader title="ログイン" onClose={() => history.replace("/")} />
      <Container tag="main" style={{ padding: "16px", textAlign: "center" }}>
        <p>初めてご利用される方はログインが会員登録になります。</p>
        <StyledButton onClick={signInWithGoogle}>
          <img src="sign_in_with_google@2x.png" alt="sign in with google" />
        </StyledButton>
      </Container>
    </div>
  );
};

const StyledButton = styled.button`
  margin-top: 16px;
  display: inline-block;
  max-width: 191px;
  background: transparent;
  img {
    max-width: 100%;
  }
`;
