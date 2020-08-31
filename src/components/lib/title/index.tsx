import React, { FC, CSSProperties } from "react";
import styled from "styled-components";
import { variables, FontSize } from "../../../styles/variables";

interface Props {
  text: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: CSSProperties;
  size?: FontSize;
}

export const Title: FC<Props> = ({ text, tag, style, size = "m" }) => {
  return (
    <StyledTitle style={style} size={size} as={tag}>
      {text}
    </StyledTitle>
  );
};

const StyledTitle = styled.div<{ size: FontSize }>`
  font-weight: bold;
  font-size: ${(props) => variables.fontSize[props.size]};
`;
