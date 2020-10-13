import React, { FC, CSSProperties } from "react";
import styled from "styled-components";

interface Props {
  tag?: "div" | "main";
  style?: CSSProperties;
  className?: string;
}

export const Container: FC<Props> = ({
  tag = "div",
  style,
  className = "",
  children,
}) => {
  return (
    <StyledContainer as={tag} style={style} className={className}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background: transparent;
  max-width: 854px;
  margin: 0 auto;
`;
