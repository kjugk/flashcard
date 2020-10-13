import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";
import { useSystemContext } from "../../../global-context/system/system.provider";
import { CSSTransition } from "react-transition-group";

/**
 * ユーザーに通知するメッセージを表示するコンポーネント
 */
export const SystemMessage: FunctionComponent = () => {
  const { systemState, systemDispatch } = useSystemContext();
  const nodeRef = useRef(null);

  function cleanupMessage() {
    systemDispatch({
      type: "system/hide-system-message",
    });
  }

  // TODO message を queue にする。
  // 消す時に、messageID をしてする。
  useEffect(() => {
    if (systemState.showMessage) {
      setTimeout(cleanupMessage, 2500);
    }

    return () => {
      // メッセージが残ってたら削除する。
      if (systemState.showMessage) cleanupMessage();
    };
    // eslint-disable-next-line
  }, [systemState.showMessage]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={systemState.showMessage}
      mountOnEnter
      unmountOnExit
      timeout={300}
      classNames="systemMessage"
    >
      <Wrapper ref={nodeRef}>
        <Message>{systemState.message}</Message>
      </Wrapper>
    </CSSTransition>
  );
};

const Wrapper = styled.div`
  background: transparent;
  display: block;
  padding: 0 16px;
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;

  &.systemMessage-enter {
    transform: translateY(150%);
  }

  &.systemMessage-enter-active {
    transform: translateY(0);
    transition: transform 300ms;
  }

  &.systemMessage-exit {
    transform: translateY(0);
  }

  &.systemMessage-exit-active {
    transform: translateY(150%);
    transition: transform 300ms;
  }

  @media only screen and (min-width: 768px) {
    left: 50%;
    margin-left: -250px;
    width: 500px;
  }
`;

const Message = styled.div`
  padding: 16px 0;
  text-align: center;
  border-radius: 6px;
  background: ${variables.colors.lightBlue};
  color: ${variables.colors.white};
  font-weight: bold;
`;
