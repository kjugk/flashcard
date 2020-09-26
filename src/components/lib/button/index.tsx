import React, { FunctionComponent, CSSProperties } from "react";
import styled from "styled-components";
import { variables, FontSize, Color } from "../../../styles/variables";

type ButtonType = "button" | "submit";

interface Props {
  label: string;
  size?: FontSize;
  type?: ButtonType;
  outlined?: boolean;
  style?: CSSProperties;
  fullWidth?: boolean;
  color?: Color;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FunctionComponent<Props> = ({
  label,
  size = "m",
  type = "button",
  outlined = false,
  fullWidth = false,
  style,
  color = "lightBlue",
  onClick,
}) => {
  return (
    <StyledButton
      style={style}
      color={color}
      size={size}
      type={type}
      outlined={outlined}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  color: Color;
  size: FontSize;
  outlined: boolean;
  fullWidth: boolean;
}>`
  font-size: ${(props) => variables.fontSize[props.size]};
  border-radius: 38px;
  font-weight: bold;
  text-align: center;
  padding: 0.8rem 1.6rem;
  line-height: 1.5;
  border: 1px solid;
  filter: brightness(1);
  transition: filter 0.1s;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  &:active,
  &:focus {
    filter: brightness(0.85);
  }
  ${(props) =>
    props.outlined
      ? `
    background: ${variables.colors.white};
    border-color: ${variables.colors[props.color]};
    color: ${variables.colors[props.color]};
    `
      : `
    background: ${variables.colors[props.color]};
    border-color: ${variables.colors[props.color]};
    color: ${variables.colors.white};
      `}
`;
