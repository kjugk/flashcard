import React, { FC, CSSProperties } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

type Tag = "div" | "li";

interface Props {
  style?: CSSProperties;
  tag?: Tag;
  withShadow?: boolean;
}

export const Box: FC<Props> = ({
  style,
  tag = "div",
  withShadow = true,
  children,
}) => {
  return (
    <StyledBox style={style} withShadow={withShadow} as={tag}>
      {children}
    </StyledBox>
  );
};

const StyledBox = styled.div<{ withShadow: boolean }>`
  background: ${variables.colors.white};
  padding: 24px 16px;
  ${(props) =>
    props.withShadow
      ? `box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
        border: 0.5px solid ${variables.colors.lightGrey};`
      : ""}
`;
