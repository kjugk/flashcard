import React, { FunctionComponent, CSSProperties } from "react";
import styled from "styled-components";
import { variables, Color } from "../../../styles/variables";
import { FontSize } from "../../../styles/variables";
import { SvgIconProps } from "@material-ui/core";

interface Props {
  icon: SvgIconProps;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: Color;
  style?: CSSProperties;
  size?: FontSize;
}

export const IconButton: FunctionComponent<Props> = ({
  icon,
  onClick,
  disabled = false,
  color = "black",
  size = "l",
  style,
}) => {
  return (
    <StyledButton
      type="button"
      disabled={disabled}
      size={size}
      color={color}
      style={style}
      onClick={onClick}
    >
      <Wrapper>{icon}</Wrapper>
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  size: FontSize;
  color: Color;
  disabled: boolean;
}>`
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  font-size: ${(props) => variables.fontSize[props.size]};
  color: ${(props) =>
    props.disabled
      ? variables.colors.lightGrey
      : variables.colors[props.color]};
  transition: background-color color 0.2s;
  border-radius: 9999px;
  text-align: center;
  vertical-align: middle;
  &:active {
    background: ${variables.colors.lightGrey};
  }
`;

const Wrapper = styled.span`
  display: flex;
  font-size: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
