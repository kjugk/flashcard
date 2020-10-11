import React, { FC } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

export interface Props {
  show: boolean;
  onClose?: () => void;
}

export const Modal: FC<Props> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <>
      <BackDrop />
      <ModalContainer onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalContent>
      </ModalContainer>
    </>
  );
};

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(33, 33, 33, 0.3);
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: ${variables.colors.white};
  font-size: ${variables.fontSize.m};
  border-radius: 6px;
  padding: 32px 16px;
  max-width: 500px;
  width: 90%;
`;
