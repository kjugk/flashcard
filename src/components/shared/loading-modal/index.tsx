import React, { FC } from "react";
import { variables } from "../../../styles/variables";
import styled from "styled-components";
import { Modal } from "../../lib/modal";
import { useSystemContext } from "../../../global-context/system/system.provider";
import Cached from "@material-ui/icons/Cached";

export const LoadingModal: FC = () => {
  const { systemState } = useSystemContext();

  return (
    <Modal show={systemState.loading}>
      <Content style={{ textAlign: "center" }}>
        <Cached
          className="icon"
          style={{ fontSize: 60, color: variables.colors.lightBlue }}
        />
        <div className="message">{systemState.loadingMessage || "Loading"}</div>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .message {
    margin-top: 16px;
    font-size: ${variables.fontSize.xl};
  }
  .icon {
    animation: spin-animation 1.4s infinite;
    display: inline-block;
  }

  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-359deg);
    }
  }
`;
