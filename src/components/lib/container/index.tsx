import React, { FC, CSSProperties } from "react";
import styled from "styled-components";

interface Props {
  tag?: "div" | "main";
  style?: CSSProperties;
}

export const Container: FC<Props> = ({ tag = "div", style, children }) => {
  return (
    <StyledContainer as={tag} style={style}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background: transparent;
  max-width: 854px;
  margin: 0 auto;
`;
