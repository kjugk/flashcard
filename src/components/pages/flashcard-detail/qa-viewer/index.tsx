import React, { FunctionComponent, useState, useMemo, useEffect } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowFoward from "@material-ui/icons/ArrowForward";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { TextButton } from "../../../lib/text-button";
import { Button } from "../../../lib/button";

interface Qa {
  question: string;
  answer: string;
}

interface Props {
  qaList: Qa[];
}

/**
 * QA を表示,制御するコンポーネント。
 */
export const QaViewer: FunctionComponent<Props> = (props) => {
  // TODO 同時に更新するstate が多いので、reducer 作る
  const [currentPage, setCurrentPage] = useState(1);
  const [inPageTransition, setInPageTransition] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [qaList, setQaList] = useState<Qa[]>([]);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => setQaList([...props.qaList]), []);

  const currantQa = useMemo(() => qaList[currentPage - 1], [
    qaList,
    currentPage,
  ]);

  // ページ変更直後は css の animation を off にする。
  useEffect(() => {
    setInPageTransition(true);
    setTimeout(() => {
      setInPageTransition(false);
    }, 150);
  }, [currentPage]);

  const changeCurrentPage = (nextPage: number) => {
    setCurrentPage(nextPage);
    setShowAnswer(false);
  };

  function shuffle<T>(array: T[]): T[] {
    if (array.length <= 1) return array;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  const shuffleList = () => {
    setQaList(
      shuffle<Qa>([...qaList])
    );
    setCurrentPage(1);
    setShuffling(true);
    setShowAnswer(false);
  };

  const resetList = () => {
    setQaList([...props.qaList]);
    setCurrentPage(1);
    setShuffling(false);
    setShowAnswer(false);
  };

  if (currantQa === undefined) return null;

  return (
    <div>
      <CardWrapper>
        <Card
          inTransition={inPageTransition}
          showAnswer={showAnswer}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <CardContent>
            <>
              {!showAnswer && <CardDescription>問題</CardDescription>}
              <pre>{currantQa.question}</pre>
            </>
          </CardContent>

          <CardContent className="answer">
            <>
              {showAnswer && <CardDescription>答え</CardDescription>}
              <pre>{currantQa.answer}</pre>
            </>
          </CardContent>
        </Card>
      </CardWrapper>

      <Controller>
        <TextButton
          disabled={currentPage === 1}
          onClick={() => changeCurrentPage(currentPage - 1)}
        >
          <ArrowBack />
        </TextButton>

        <div className="pagenation">{`${currentPage}/${qaList.length}`}</div>

        <TextButton
          disabled={currentPage === qaList.length}
          onClick={() => changeCurrentPage(currentPage + 1)}
        >
          <ArrowFoward />
        </TextButton>
      </Controller>
      <div>
        <Button
          label={shuffling ? "シャッフル中" : "シャッフル"}
          outlined
          size="xs"
          onClick={() => (shuffling ? resetList() : shuffleList())}
        />
      </div>
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
  padding: 16px;
  overflow-y: scroll;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  &.answer {
    transform: rotateY(-180deg);
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const Controller = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 24px;
  .pagenation {
    margin: 0 16px;
    letter-spacing: 0.6rem;
  }
`;
