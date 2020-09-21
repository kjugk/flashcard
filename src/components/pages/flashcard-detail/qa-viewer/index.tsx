import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowFoward from "@material-ui/icons/ArrowForward";
import Shuffle from "@material-ui/icons/Shuffle";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { IconButton } from "../../../lib/icon-button";
import { Button } from "../../../lib/button";
import { Qa } from "../store";
import { shuffle } from "../../../../lib/util";
import { ProgressBar } from "../progress-bar";
import Hammer from "hammerjs";

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

  const showNextPage = () => {
    if (currentPage === qaList.length) {
      setShowLastPage(true);
      return;
    }

    setCurrentPage(currentPage + 1);
    setShowAnswer(false);
  };

  const showPrevPage = () => {
    if (showLastPage) {
      setShowLastPage(false);
    }

    if (currentPage <= 1) return;

    setCurrentPage(currentPage - 1);
  };

  const shuffleList = () => {
    setIndexList(shuffle<number>(indexList));
    setCurrentPage(1);
    setShuffling(true);
    setShowLastPage(false);
    setShowAnswer(false);
  };

  const resetList = () => {
    setIndexList(generateDefaultIndexList());
    setCurrentPage(1);
    setShuffling(false);
    setShowLastPage(false);
    setShowAnswer(false);
  };

  useEffect(() => setIndexList(generateDefaultIndexList()), []);

  // ページ変更直後は css の animation を off にする。
  useEffect(() => {
    setShowAnswer(false);

    setInPageTransition(true);
    setTimeout(() => {
      setInPageTransition(false);
    }, 150);
  }, [currentPage]);

  // スワイプジェスチャー対応
  let hammer: HammerManager;
  const ref = useRef<HTMLDivElement>(null);

  const handleSwipe = (ev: HammerInput) => {
    switch (ev.direction) {
      case Hammer.DIRECTION_LEFT:
        showNextPage();
        break;
      case Hammer.DIRECTION_RIGHT:
        showPrevPage();
        break;
      default:
    }
  };

  useEffect(() => {
    if (ref.current === null) return;

    hammer = new Hammer(ref.current);
    hammer.on("swipe", handleSwipe);

    return () => {
      hammer.off("swipe", handleSwipe);
    };
  });

  useEffect(() => {
    return () => {
      if (hammer) {
        hammer.stop(true);
        hammer.destroy();
      }
    };
  }, []);

  const currantQa = useMemo(() => qaList[indexList[currentPage - 1]], [
    qaList,
    indexList,
    currentPage,
  ]);

  if (currantQa === undefined) return null;

  return (
    <div>
      <CardViewer ref={ref}>
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
      </CardViewer>

      <ProgressBar
        currentPage={currentPage}
        totalPage={qaList.length}
        style={{ margin: "32px auto", maxWidth: "768px" }}
      />

      <Controller>
        <IconButton
          icon={<ArrowBack />}
          disabled={currentPage === 1}
          onClick={showPrevPage}
        />

        <div className="pagenation">{`${currentPage} / ${qaList.length}`}</div>

        <IconButton
          icon={<ArrowFoward />}
          disabled={showLastPage}
          onClick={showNextPage}
        />

        <IconButton
          style={{ position: "absolute", right: 0 }}
          icon={<Shuffle />}
          color={shuffling ? "lightBlue" : "darkGrey"}
          onClick={() => (shuffling ? resetList() : shuffleList())}
        />
      </Controller>
    </div>
  );
};

const CardViewer = styled.div``;

const CardWrapper = styled.div`
  max-width: 768px;
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
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 18px;
  max-width: 768px;
  margin: 0 auto;
  margin-bottom: 24px;
  .pagenation {
    margin: 0 16px;
  }
`;
