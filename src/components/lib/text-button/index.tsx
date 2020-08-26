import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";
import { FontSize } from "../../../styles/variables";

interface Props {
  disabled: boolean;
  size?: FontSize;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TextButton: FunctionComponent<Props> = ({
  disabled,
  size = "m",
  onClick,
  children,
}) => {
  return (
    <StyledButton
      type="button"
      disabled={disabled}
      size={size}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ size: FontSize; disabled: boolean }>`
  font-size: ${(props) => variables.fontSize[props.size]}
    ${(props) => (props.disabled ? "color: grey" : "")};
`;
