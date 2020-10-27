import { SvgIconProps } from "@material-ui/core";
import React, { CSSProperties, FC, useRef } from "react";
import styled from "styled-components";
import { Color, FontSize, variables } from "../../../styles/variables";

interface Props {
  icon: SvgIconProps;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: Color;
  style?: CSSProperties;
  size?: FontSize;
}

export const IconButton: FC<Props> = ({
  icon,
  onClick,
  disabled = false,
  color = "black",
  size = "l",
  style,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <StyledButton
      ref={buttonRef}
      type="button"
      disabled={disabled}
      size={size}
      color={color}
      style={style}
      onClick={(e) => {
        buttonRef.current?.blur();
        onClick(e);
      }}
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
  line-height: 1.43;
  padding: 0.5em;
  font-size: ${(props) => variables.fontSize[props.size]};
  color: ${(props) =>
    props.disabled
      ? variables.colors.lightGrey
      : variables.colors[props.color]};
  border-radius: 50%;
  &:active {
    background: rgba(76, 125, 222, 0.2);
  }

  @media only screen and (min-width: 768px) {
    &:hover,
    &:focus,
    &:active {
      background: rgba(76, 125, 222, 0.2);
    }
  }
`;

const Wrapper = styled.span`
  display: flex;
  font-size: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
