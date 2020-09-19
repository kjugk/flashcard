import React, { FunctionComponent, useState } from "react";
import Add from "@material-ui/icons/Add";
import ExitToApp from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../../lib/cognito";
import { useIsSignedIn } from "../../../global/current-user/current-user.store";
import { useCurrentUserContext } from "../../../global/current-user/current-user.provider";
import { Container } from "../../lib";
import { Popover } from "../../lib/popover";
import { variables } from "../../../styles/variables";
import { TextButton } from "../../lib/text-button";

export const Header: FunctionComponent = () => {
  const { currentUserState, currentUserDispatch } = useCurrentUserContext();
  const history = useHistory();
  const isSignedIn = useIsSignedIn(currentUserState);
  const [showPopover, setShowPopover] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    currentUserDispatch({
      type: "sign-out",
    });
  };

  return (
    <StyledHeader>
      <Container style={{ padding: "0 16px" }}>
        <Nav>
          <Link to="/flashcard-list" className="brand">
            Flashcard
          </Link>

          <TextButton onClick={() => history.push("/flashcard-create")}>
            <Add />
          </TextButton>

          {isSignedIn && (
            <ProfileIconWrapper>
              <ProfileIcon
                src={currentUserState.picture}
                alt="ユーザープロフィールアイコン"
                onClick={() => setShowPopover(true)}
              />
              <Popover show={showPopover} onClose={() => setShowPopover(false)}>
                <List>
                  <li role="menuItem" onClick={handleSignOut}>
                    <ExitToApp className="icon" />
                    <span>ログアウト</span>
                  </li>
                </List>
              </Popover>
            </ProfileIconWrapper>
          )}
        </Nav>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: ${variables.colors.lightBlue};
  color: ${variables.colors.white};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  margin-bottom: 3px;
  padding: 12px 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  .brand {
    flex: 1;
  }
`;

const ProfileIconWrapper = styled.div`
  position: relative;
  margin-left: 8px;
`;

const ProfileIcon = styled.img`
  border-radius: 50%;
  width: 24px;
`;

// TODO コンポーネントに切り出す
const List = styled.ul`
  display: block;
  padding: 24px;
  min-width: 180px;
  color: black;
  li {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0px;
    }
    .icon {
      margin-right: 16px;
    }
  }
`;
