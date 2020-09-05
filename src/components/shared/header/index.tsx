import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signOut } from "../../../lib/cognito";
import { useIsSignedIn } from "../../../global/current-user/current-user.store";
import { useCurrentUserContext } from "../../../global/current-user/current-user.provider";
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
      <Container style={{ padding: "0 16px" }}>
        <nav>
          <Link to="/flashcard-list">Flashcard</Link>
          <Link to="/flashcard-create">新規作成</Link>
          {isSignedIn && (
            <Button label="ログアウト" size="xs" onClick={handleSignOut} />
          )}
        </nav>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: ${variables.colors.white};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  margin-bottom: 3px;
  padding: 16px 0;
`;
