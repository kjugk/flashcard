import React, { FC, CSSProperties } from "react";
import styled from "styled-components";
import { variables, FontSize } from "../../../styles/variables";

interface Props {
  text: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  style?: CSSProperties;
  size?: FontSize;
  ellipsis?: boolean;
}

export const Title: FC<Props> = ({
  text,
  tag,
  style,
  size = "m",
  ellipsis = false,
}) => {
  return (
    <StyledTitle style={style} size={size} as={tag} ellipsis={ellipsis}>
      {text}
    </StyledTitle>
  );
};

const StyledTitle = styled.div<{ size: FontSize; ellipsis: boolean }>`
  font-weight: bold;
  font-size: ${(props) => variables.fontSize[props.size]};
  ${(props) => {
    if (props.ellipsis) {
      return "white-space: nowrap; overflow: hidden; text-overflow: ellipsis";
    }
  }};
`;
