import React, { FC, useMemo, CSSProperties } from "react";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";

interface Props {
  currentPage: number;
  totalPage: number;
  style?: CSSProperties;
}

export const ProgressBar: FC<Props> = ({ currentPage, totalPage, style }) => {
  const barRate = useMemo(() => {
    if (totalPage === 0) return 0;

    return Math.round((currentPage / totalPage) * 100);
  }, [currentPage, totalPage]);

  return (
    <Wrapper style={style}>
      <Bar rate={barRate} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 12px;
  position: relative;
  width: 100%;
  height: 8px;
  background: #f1f1f1;
`;

const Bar = styled.div<{ rate: number }>`
  border-radius: 12px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: ${variables.colors.lightBlue};
  width: ${(props) => props.rate}%;
  transition: width 0.2s ease-out;
`;
