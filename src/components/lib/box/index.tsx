import React, { FC } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

export const Box: FC = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

const StyledBox = styled.div`
  background: ${variables.colors.white};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 16px;
`;
