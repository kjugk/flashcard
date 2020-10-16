import { SvgIconProps } from "@material-ui/core";
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
  icon?: SvgIconProps;
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
  icon,
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
      <Inner>
        {icon}
        <div className="label">{label}</div>
      </Inner>
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
  padding: 1.2em 1.6em;
  display: inline-block;
  border: 1px solid;
  filter: brightness(1);
  transition: filter 0.1s;
  ${(props) =>
    props.fullWidth
      ? "width: min(100%, 500px); margin: 0 auto"
      : "width: auto"};
  &:active,
  &:focus {
    filter: brightness(0.95);
  }
  @media only screen and (min-width: 768px) {
    &:hover {
      filter: brightness(0.95);
    }
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

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .label {
    line-height: 1;
  }
  svg {
    margin-right: 6px;
  }
`;
