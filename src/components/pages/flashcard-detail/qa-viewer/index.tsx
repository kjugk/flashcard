import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowFoward from "@material-ui/icons/ArrowForward";
import Shuffle from "@material-ui/icons/Shuffle";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { IconButton } from "../../../lib/icon-button";
import { Button } from "../../../lib/button";
import { Qa } from "../store";
import { ProgressBar } from "../progress-bar";
import Hammer from "hammerjs";

import { useCurrentQa, useQaViewerReducer } from "./store";

interface Props {
  qaList: Qa[];
}

/**
 * QA を表示,制御するコンポーネント。
 */
export const QaViewer: FunctionComponent<Props> = ({ qaList }) => {
  const [state, dispatch] = useQaViewerReducer(qaList);
  const currentQa = useCurrentQa(state);
  const [inPageTransition, setInPageTransition] = useState(false);

  const showNextPage = () => dispatch({ type: "show-next-page" });
  const showPrevPage = () => dispatch({ type: "show-prev-page" });
  const flipQa = () =>
    dispatch({
      type: "flip-qa",
      payload: state.showAnswer ? "question" : "answer",
    });

  // ページ変更直後は css の animation を off にする。
  useEffect(() => {
    setInPageTransition(true);
    setTimeout(() => {
      setInPageTransition(false);
    }, 150);
  }, [state.currentPage]);

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

  if (currentQa === undefined) return null;

  return (
    <div>
      <CardViewer ref={ref}>
        <CardWrapper>
          {state.showEndOfQa && (
            <Card showAnswer={false} inTransition={false}>
              <CardContent>
                <div className="sentence">
                  <div>終了です！ お疲れさまでした！</div>
                  <Button
                    label="最初から"
                    size="s"
                    onClick={() => dispatch({ type: "restart-qa" })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {!state.showEndOfQa && (
            <Card
              inTransition={inPageTransition}
              showAnswer={state.showAnswer}
              onClick={flipQa}
            >
              <CardContent>
                <CardLabel color="lightBlue">問題</CardLabel>
                <div className="sentence">
                  <div>{currentQa.question}</div>
                </div>
                {state.currentPage === 1 && (
                  <div className="guide">答えを見る場合はカードをタップ</div>
                )}
              </CardContent>

              <CardContent className="answer">
                <CardLabel color="green">答え</CardLabel>
                <div className="sentence">
                  <div>{currentQa.answer}</div>
                </div>
                {state.currentPage === 1 && (
                  <div className="guide">左スワイプで次の問題</div>
                )}
              </CardContent>
            </Card>
          )}
        </CardWrapper>
      </CardViewer>

      <ProgressBar
        currentPage={state.currentPage}
        totalPage={qaList.length}
        style={{ margin: "32px auto", maxWidth: "768px" }}
      />

      <Controller>
        <IconButton
          icon={<ArrowBack />}
          disabled={state.currentPage === 1}
          onClick={showPrevPage}
        />

        <div className="pagenation">{`${state.currentPage} / ${qaList.length}`}</div>

        <IconButton
          icon={<ArrowFoward />}
          disabled={state.showEndOfQa}
          onClick={showNextPage}
        />

        <IconButton
          style={{ position: "absolute", right: 0 }}
          size="xxl"
          icon={<Shuffle />}
          color={state.shuffling ? "lightBlue" : "darkGrey"}
          onClick={() => dispatch({ type: "toggle-shuffle" })}
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
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  border: 0.5px solid ${variables.colors.lightGrey};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  &.answer {
    transform: rotateY(-180deg);
  }
  .sentence {
    font-weight: bold;
    flex: 1;
    display: flex;
    flex-direction: colmun;
    align-items: center;
    justify-content: center;
    padding: 16px;
    overflow: hidden;
    div {
      max-height: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: scroll;
    }
  }
  .guide {
    background: ${variables.colors.darkGrey};
    color: ${variables.colors.white};
    font-size: ${variables.fontSize.xs};
    text-align: center;
    padding: 4px 0;
  }
`;

const CardLabel = styled.div<{ color: "lightBlue" | "green" }>`
  background: ${(props) => variables.colors[props.color]};
  color: ${variables.colors.white};
  font-size: ${variables.fontSize.m};
  font-weight: bold;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    font-size: ${variables.fontSize.m};
    margin: 0 16px;
  }
`;
