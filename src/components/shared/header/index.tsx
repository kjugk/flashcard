import React, { FunctionComponent, useState } from "react";
import Add from "@material-ui/icons/Add";
import ExitToApp from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../../lib/cognito";
import { useIsSignedIn } from "../../../global/current-user/current-user.store";
import { useCurrentUserContext } from "../../../global/current-user/current-user.provider";
import { Container } from "../../lib/container";
import { Popover } from "../../lib/popover";
import { IconButton } from "../../lib/icon-button";
import { variables } from "../../../styles/variables";

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
            <img src="/brand.png" alt="brand logo" width="163x" />
          </Link>

          <IconButton
            icon={<Add />}
            onClick={() => history.push("/flashcard-create")}
          />

          {isSignedIn && (
            <ProfileIconWrapper>
              <ProfileIcon
                src={currentUserState.picture}
                alt="ユーザープロフィールアイコン"
                onClick={() => setShowPopover(true)}
              />
              <Popover show={showPopover} onClose={() => setShowPopover(false)}>
                <List>
                  <li onClick={handleSignOut}>
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
  background: ${variables.colors.white};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  padding: 12px 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  .brand {
    flex: 1;
    line-height: 1;
  }
`;

const ProfileIconWrapper = styled.div`
  position: relative;
  margin-left: 12px;
  line-height: 1;
`;

const ProfileIcon = styled.img`
  border-radius: 9999px;
  width: 32px;
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
