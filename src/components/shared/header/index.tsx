import React, { FC, useState } from "react";
import Add from "@material-ui/icons/Add";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Block from "@material-ui/icons/Block";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../../lib/cognito";
import { useIsSignedIn } from "../../../global-context/current-user/current-user.store";
import { useCurrentUserContext } from "../../../global-context/current-user/current-user.provider";
import { Container } from "../../lib/container";
import { Popover } from "../../lib/popover";
import { IconButton } from "../../lib/icon-button";
import { variables } from "../../../styles/variables";
import { ConfirmableModal } from "../../lib/confirmable-modal";
import { useSystemContext } from "../../../global-context/system/system.provider";
import { accountRepository } from "../../../repositories/account/account-repository";
import { handleHttpError } from "../../utils/http-util";
import { Button } from "../../lib";

interface Props {
  showUser?: boolean;
}

export const Header: FC<Props> = ({ showUser = true }) => {
  const { currentUserState, currentUserDispatch } = useCurrentUserContext();
  const { systemDispatch } = useSystemContext();
  const history = useHistory();
  const isSignedIn = useIsSignedIn();
  const [showPopover, setShowPopover] = useState(false);
  const [showAccountDeleteConfirm, setShowAccountDeleteConfirm] = useState(
    false
  );

  const handleSignOut = async () => {
    await signOut();
    currentUserDispatch({
      type: "sign-out",
    });
  };

  const handleDeleteAccount = async () => {
    setShowAccountDeleteConfirm(false);
    systemDispatch({
      type: "system/update-loading",
      payload: {
        loading: true,
        message: "削除中",
      },
    });

    try {
      await accountRepository.delete();

      // サインアウト
      await signOut();
      currentUserDispatch({
        type: "sign-out",
      });
    } catch (e) {
      handleHttpError(e, systemDispatch);

      systemDispatch({
        type: "system/set-system-message",
        payload: {
          messageType: "error",
          message: "削除できませんでした。",
        },
      });
    } finally {
      systemDispatch({
        type: "system/update-loading",
        payload: {
          loading: false,
        },
      });
    }
  };

  return (
    <StyledHeader>
      <Container style={{ padding: "0 16px" }}>
        <Nav>
          <Link to="/" className="brand">
            <img src="/brand.svg" alt="brand logo" width="163" />
          </Link>

          {!isSignedIn && (
            <Button
              outlined
              size="xs"
              onClick={() => history.push("/sign-in")}
              label="ログイン"
            />
          )}

          {isSignedIn && !showUser && (
            <Button
              outlined
              size="xs"
              onClick={() => history.push("/sign-in")}
              label="ログイン"
            />
          )}

          {isSignedIn && showUser && (
            <>
              <IconButton
                icon={<Add />}
                onClick={() => history.push("/flashcard-create")}
              />
              <ProfileIconWrapper>
                <ProfileIcon
                  src={currentUserState.picture}
                  alt="ユーザープロフィールアイコン"
                  onClick={() => setShowPopover(true)}
                />
                <Popover
                  show={showPopover}
                  onClose={() => setShowPopover(false)}
                >
                  <List>
                    <li>
                      <ProfileIcon
                        src={currentUserState.picture}
                        alt="ユーザープロフィールアイコン"
                        className="icon"
                      />
                      {currentUserState.name}
                    </li>
                    <li onClick={handleSignOut}>
                      <ExitToApp className="icon" />
                      <span>ログアウト</span>
                    </li>
                  </List>
                  <hr
                    style={{
                      height: "1px",
                      border: "none",
                      backgroundColor: variables.colors.lightGrey,
                    }}
                  />
                  <List>
                    <li onClick={() => setShowAccountDeleteConfirm(true)}>
                      <Block
                        className="icon"
                        style={{ color: variables.colors.red }}
                      />
                      <span style={{ color: variables.colors.red }}>
                        アカウント削除
                      </span>
                    </li>
                  </List>
                </Popover>
              </ProfileIconWrapper>
            </>
          )}
        </Nav>
      </Container>

      <ConfirmableModal
        title="アカウントを削除しますか?"
        description="全ての問題集が削除されます。"
        submitLabel="削除"
        show={showAccountDeleteConfirm}
        onCancel={() => setShowAccountDeleteConfirm(false)}
        onClose={() => setShowAccountDeleteConfirm(false)}
        onSubmit={handleDeleteAccount}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: ${variables.colors.white};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
`;

const Nav = styled.nav`
  display: flex;
  height: 66px;
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
  min-width: 200px;
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
      width: 24px;
      margin-right: 16px;
    }
  }
`;
