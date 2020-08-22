import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signOut } from "../../../lib/cognito";
import { useIsSignedIn } from "../../../global/store/current-user.store";
import { useCurrentUserContext } from "../../../global/provider/current-user.provider";
import { Button, Container } from "../../lib";
import { variables } from "../../../styles/variables";

export const Header: FunctionComponent = () => {
  const { currentUserState, currentUserDispatch } = useCurrentUserContext();
  const isSignedIn = useIsSignedIn(currentUserState);
  const handleSignOut = async () => {
    await signOut();
    currentUserDispatch({
      type: "sign-out",
    });
  };

  return (
    <StyledHeader>
      <Container>
        <nav>
          <Link to="/">Flashcard</Link>
          <Link to="/flashcard-create">新規作成</Link>
          {isSignedIn && <Button label="ログアウト" onClick={handleSignOut} />}
        </nav>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: ${variables.colors.white};
  padding: 16px;
`;
