import React, { FunctionComponent, useState, useMemo, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [inTransition, setInTransition] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const currantQa = useMemo(() => qaList[currentPage - 1], [
    qaList,
    currentPage,
  ]);

  // ページ変更直後は css の animation を off にする。
  useEffect(() => {
    setInTransition(true);
    setTimeout(() => {
      setInTransition(false);
    }, 10);
  }, [currentPage]);

  return (
    <div>
      <CardWrapper>
        <Card
          inTransition={inTransition}
          showAnswer={showAnswer}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <CardContent>
            {!showAnswer && <CardDescription>問題</CardDescription>}
            <div>{currantQa.question}</div>
          </CardContent>

          <CardContent className="answer">
            {showAnswer && <CardDescription>答え</CardDescription>}
            <div>{currantQa.answer}</div>
          </CardContent>
        </Card>
      </CardWrapper>

      <Controller>
        <TextButton
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setShowAnswer(false);
          }}
        >
          <ArrowBack />
        </TextButton>

        <div className="pagenation">{`${currentPage}/${qaList.length}`}</div>

        <TextButton
          disabled={currentPage === qaList.length}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setShowAnswer(false);
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

const CardDescription = styled.span`
  display: inline-block;
  position: absolute;
  color: #858a8d;
  left: 8px;
  top: 8px;
  font-size: 12px;
  font-weight: bold;
`;

const Card = styled.div<{ showAnswer: boolean; inTransition: boolean }>`
  position: relative;
  width: 100%;
  padding-bottom: 80%;
  margin: 16px 0;
  transform-style: preserve-3d;
  ${(props) => (props.inTransition ? "" : "transition: transform 0.4s;")}
  ${(props) => (props.showAnswer ? "transform: rotateY(-180deg);" : "")}
`;

const CardContent = styled.div`
  background: ${variables.colors.white};
  border: 0.5px solid ${variables.colors.lightGrey};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${variables.fontSize.xxl};
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  &.answer {
    transform: rotateY(-180deg);
  }
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
