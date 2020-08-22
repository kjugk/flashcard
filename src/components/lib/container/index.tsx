import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  tag?: "div" | "main";
}

export const Container: FC<Props> = ({ tag = "div", children }) => {
  return <StyledContainer as={tag}>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  width: 768px;
  margin: 0 auto;
`;
