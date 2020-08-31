import React, { FunctionComponent, CSSProperties } from "react";
import styled from "styled-components";
import { variables, FontSize } from "../../../styles/variables";

type ButtonType = "button" | "submit";

interface Props {
  label: string;
  size?: FontSize;
  type?: ButtonType;
  outlined?: boolean;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FunctionComponent<Props> = ({
  label,
  size = "m",
  type = "button",
  outlined = false,
  style,
  onClick,
}) => {
  return (
    <StyledButton
      style={style}
      size={size}
      type={type}
      outlined={outlined}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ size: FontSize; outlined: boolean }>`
  background: #333;
  color: white;
  font-size: ${(props) => variables.fontSize[props.size]};
  border-radius: 38px;
  font-weight: bold;
  text-align: center;
  padding: 0.8rem 1.6rem;
  line-height: 1.5;
  border: 1px solid #333;
  filter: brightness(1);
  transition: filter 0.1s;
  &:active {
    filter: brightness(0.85);
  }
  ${(props) =>
    props.outlined
      ? `
    background: white;
    color: #333;
    `
      : `
    background: #333;
    color: white;
      `}
`;
