import React, { FC } from "react";
import styled from "styled-components";
import Cached from "@material-ui/icons/Cached";

interface Props {
  show: boolean;
}

export const LoadingSpinner: FC<Props> = ({ show }) => {
  if (!show) return null;

  return (
    <Wrapper>
      <Cached className="icon" style={{ fontSize: 40 }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  background: transparent;
  padding: 16px;
  .icon {
    animation: spin-animation 1.4s infinite;
    display: inline-block;
  }

  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-359deg);
    }
  }
`;
