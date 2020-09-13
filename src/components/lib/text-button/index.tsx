import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";
import { FontSize } from "../../../styles/variables";

interface Props {
  fullWidth?: boolean;
  disabled?: boolean;
  size?: FontSize;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TextButton: FunctionComponent<Props> = ({
  fullWidth = false,
  disabled = false,
  size = "m",
  onClick,
  children,
}) => {
  return (
    <StyledButton
      type="button"
      fullWidth={fullWidth}
      disabled={disabled}
      size={size}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  size: FontSize;
  disabled: boolean;
  fullWidth: boolean;
}>`
  display: inline-block;
  line-height: 1;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  font-size: ${(props) => variables.fontSize[props.size]};
  ${(props) => (props.disabled ? `color: ${variables.colors.lightGrey}` : "")};
`;
