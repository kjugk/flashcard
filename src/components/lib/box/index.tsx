import React, { FC, CSSProperties } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

interface Props {
  style?: CSSProperties;
  withShadow?: boolean;
}

export const Box: FC<Props> = ({ style, withShadow = true, children }) => {
  return (
    <StyledBox style={style} withShadow={withShadow}>
      {children}
    </StyledBox>
  );
};

const StyledBox = styled.div<{ withShadow: boolean }>`
  background: ${variables.colors.white};
  border: 0.5px solid ${variables.colors.lightGrey};
  padding: 16px;
  ${(props) =>
    props.withShadow ? "box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2)" : ""}
`;
