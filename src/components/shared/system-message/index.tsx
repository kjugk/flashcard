import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";
import { useSystemContext } from "../../../global/system/system.provider";
import { useHasAnyMessage } from "../../../global/system/system.store";
import { CSSTransition } from "react-transition-group";

/**
 * ユーザーに通知するメッセージを表示するコンポーネント
 */
export const SystemMessage: FunctionComponent = () => {
  const { systemState, systemDispatch } = useSystemContext();
  const nodeRef = useRef(null);
  const hasAnyMessage = useHasAnyMessage(systemState);

  function cleanupMessage() {
    systemDispatch({
      type: "cleanup-message",
    });
  }

  // TODO message を queue にする。
  // 消す時に、messageID をしてする。
  useEffect(() => {
    if (hasAnyMessage) {
      setTimeout(cleanupMessage, 2500);
    }

    return () => {
      // メッセージが残ってたら削除する。
      if (hasAnyMessage) cleanupMessage();
    };
    // eslint-disable-next-line
  }, [hasAnyMessage]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={hasAnyMessage}
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
    transform: translateY(200%);
  }

  &.systemMessage-enter-active {
    transform: translateY(0);
    transition: transform 300ms;
  }

  &.systemMessage-exit {
    transform: translateY(0);
  }

  &.systemMessage-exit-active {
    transform: translateY(200%);
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
  background: ${variables.colors.lightBlue};
  color: ${variables.colors.white};
  font-weight: bold;
`;
