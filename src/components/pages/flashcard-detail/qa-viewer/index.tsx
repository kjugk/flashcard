import React, { FunctionComponent, useState, useMemo, useEffect } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowFoward from "@material-ui/icons/ArrowForward";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { TextButton } from "../../../lib/text-button";
import { Button } from "../../../lib/button";
import { Qa } from "../store";
import { shuffle } from "../../../../lib/util";

interface Props {
  qaList: Qa[];
}

/**
 * QA を表示,制御するコンポーネント。
 */
export const QaViewer: FunctionComponent<Props> = ({ qaList }) => {
  // TODO 同時に更新する state が多いので、reducer 作る。
  const [currentPage, setCurrentPage] = useState(1);
  const [inPageTransition, setInPageTransition] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [showLastPage, setShowLastPage] = useState(false);
  const [indexList, setIndexList] = useState<number[]>([]);

  const generateDefaultIndexList = () => {
    return Array.from(Array(qaList.length).keys());
  };

  const changeCurrentPage = (nextPage: number) => {
    setCurrentPage(nextPage);
    setShowAnswer(false);
  };

  const shuffleList = () => {
    setIndexList(shuffle<number>(indexList));
    setCurrentPage(1);
    setShuffling(true);
    setShowAnswer(false);
  };

  const resetList = () => {
    setIndexList(generateDefaultIndexList());
    setCurrentPage(1);
    setShuffling(false);
    setShowAnswer(false);
  };

  useEffect(() => setIndexList(generateDefaultIndexList()), []);

  // ページ変更直後は css の animation を off にする。
  useEffect(() => {
    setInPageTransition(true);
    setTimeout(() => {
      setInPageTransition(false);
    }, 150);
  }, [currentPage]);

  const currantQa = useMemo(() => qaList[indexList[currentPage - 1]], [
    qaList,
    indexList,
    currentPage,
  ]);

  if (currantQa === undefined) return null;

  return (
    <div>
      <CardWrapper>
        {showLastPage && (
          <Card showAnswer={false} inTransition={false}>
            <CardContent>
              <pre>終了です！ お疲れさまでした！</pre>
              <Button
                label="最初から"
                size="s"
                onClick={() => {
                  setShowAnswer(false);
                  setShowLastPage(false);
                  setCurrentPage(1);
                }}
              />
            </CardContent>
          </Card>
        )}
        {!showLastPage && (
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
        )}
      </CardWrapper>

      <Controller>
        <TextButton
          disabled={currentPage === 1}
          onClick={() => {
            if (showLastPage) {
              setShowLastPage(false);
            } else {
              changeCurrentPage(currentPage - 1);
            }
          }}
        >
          <ArrowBack style={{ fontSize: 40 }} />
        </TextButton>

        <div className="pagenation">{`${currentPage}/${qaList.length}`}</div>

        <TextButton
          disabled={showLastPage}
          onClick={() => {
            if (currentPage === qaList.length) {
              setShowLastPage(true);
            } else {
              changeCurrentPage(currentPage + 1);
            }
          }}
        >
          <ArrowFoward style={{ fontSize: 40 }} />
        </TextButton>
      </Controller>

      <div style={{ textAlign: "center" }}>
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
  flex-direction: column;
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
