import React, { FunctionComponent, useState, useMemo } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowFoward from "@material-ui/icons/ArrowForward";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { TextButton } from "../../../lib/text-button";

interface Props {
  qaList: {
    question: string;
    answer: string;
  }[];
}

/**
 * QA を表示,制御するコンポーネント。
 */
export const QaViewer: FunctionComponent<Props> = (props) => {
  const { qaList } = props;
  const [currentPage, changeCurrentPage] = useState(1);
  const [showAnswer, toggleShowAnswer] = useState(false);

  const currantQa = useMemo(() => qaList[currentPage - 1], [
    qaList,
    currentPage,
  ]);

  if (currantQa === undefined) {
    // TODO raise Error
    return null;
  }

  return (
    <div>
      <CardWrapper>
        <Card>
          <CardContent onClick={() => toggleShowAnswer(!showAnswer)}>
            {!showAnswer && <div>{currantQa.question}</div>}
            {showAnswer && <div>{currantQa.answer}</div>}
          </CardContent>
        </Card>
      </CardWrapper>

      <Controller>
        <TextButton
          disabled={currentPage === 1}
          onClick={() => {
            toggleShowAnswer(false);
            changeCurrentPage(currentPage - 1);
          }}
        >
          <ArrowBack />
        </TextButton>

        <div className="pagenation">{`${currentPage}/${qaList.length}`}</div>

        <TextButton
          disabled={currentPage === qaList.length}
          onClick={() => {
            toggleShowAnswer(false);
            changeCurrentPage(currentPage + 1);
          }}
        >
          <ArrowFoward />
        </TextButton>
      </Controller>
    </div>
  );
};

const CardWrapper = styled.div`
  max-width: 500px;
  position: relative;
  margin: 0 auto;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 80%;
  margin: 16px 0;
`;

const CardContent = styled.div`
  background: ${variables.colors.white};
  border: 0.5px solid ${variables.colors.lightGrey};
  box-sizing: border-box;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${variables.fontSize.xxl};
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Controller = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  .pagenation {
    margin: 0 16px;
    letter-spacing: 0.6rem;
  }
`;
