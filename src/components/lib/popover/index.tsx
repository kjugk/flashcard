import React, { FC } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

interface Props {
  show: boolean;
  onClose: () => void;
}

export const Popover: FC<Props> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <>
      <StyledPopover>{children}</StyledPopover>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
    </>
  );
};

const StyledPopover = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  border: 0.5px solid #cccccc;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  z-index: 1000;
  background: ${variables.colors.white};
`;

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 999;
`;
