import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TextButton: FunctionComponent<Props> = ({
  disabled,
  onClick,
  children,
}) => {
  return (
    <StyledButton type="button" onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ disabled: boolean }>`
  ${(props) => (props.disabled ? "color: grey" : "")};
`;
