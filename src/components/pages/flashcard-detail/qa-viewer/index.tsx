import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowFoward from "@material-ui/icons/ArrowForward";
import Replay from "@material-ui/icons/Replay";
import Shuffle from "@material-ui/icons/Shuffle";
import Hammer from "hammerjs";
import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import { variables } from "../../../../styles/variables";
import { Button } from "../../../lib/button";
import { IconButton } from "../../../lib/icon-button";
import { EditButton } from "../edit-button";
import { ProgressBar } from "../progress-bar";
import { QaState } from "../store";
import { useCurrentQa, useQaViewerReducer } from "./store";

interface Props {
  qaList: QaState[];
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * QA を表示,制御するコンポーネント。
 */
export const QaViewer: FunctionComponent<Props> = ({
  qaList,
  onEdit,
  onDelete,
}) => {
  const [state, dispatch] = useQaViewerReducer(qaList);
  const [inPageTransition, setInPageTransition] = useState(false);

  const showNextPage = () => dispatch({ type: "show-next-page" });
  const showPrevPage = () => dispatch({ type: "show-prev-page" });
  const flipQa = () => dispatch({ type: "flip-qa" });
  const shuffleButtonRef = useRef<HTMLButtonElement>(null);

  // スワイプジェスチャー対応
  const hammerRef = useRef<HammerManager>();
  const handleSwipe = (ev: HammerInput) => {
    console.log(JSON.stringify(state, null, 2));

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

  const handleKeyPress = (e: KeyboardEvent) => {
    // TODO 最新の state が取れない問題について調べる。
    switch (e.key) {
      case "Enter":
        flipQa();
        break;
      case "ArrowLeft":
        showPrevPage();
        break;
      case "ArrowRight":
        showNextPage();
        break;

      default:
    }
  };

  // ページ変更直後は css の animation を off にする。
  useLayoutEffect(() => {
    setInPageTransition(true);
    setTimeout(() => {
      setInPageTransition(false);
    }, 200);
  }, [state.currentPage]);

  useEffect(() => {
    if (hammerRef.current !== undefined) {
      hammerRef.current.on("swipe", handleSwipe);
    }

    window.addEventListener("keyup", handleKeyPress, false);

    return () => {
      window.removeEventListener("keyup", handleKeyPress, false);

      if (hammerRef.current !== undefined) {
        hammerRef.current.stop(true);
        hammerRef.current.destroy();
      }
    };
  });

  const currentQa = useCurrentQa(state);
  const isFirstPage = state.currentPage === 1;

  if (currentQa === undefined) return null;

  return (
    <div>
      <div ref={(e) => e && (hammerRef.current = new Hammer(e))}>
        <CardWrapper>
          {state.showEndOfQa && (
            <Card showAnswer={false} inTransition={false}>
              <CardContent>
                <div className="sentence">
                  <div style={{ marginBottom: "16px" }}>
                    終了です！ お疲れさまでした！
                  </div>
                  <Button
                    label="最初からやり直す"
                    icon={<Replay fontSize="small" />}
                    outlined
                    size="xs"
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
                  <pre>{currentQa.question}</pre>
                </div>
                {isFirstPage && !state.showAnswer && (
                  <div className="guide">カードをタップで答えを表示</div>
                )}
              </CardContent>

              <CardContent className="answer">
                <CardLabel color="green">答え</CardLabel>
                <div className="sentence">
                  <pre>{currentQa.answer}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </CardWrapper>
      </div>

      <ProgressBar
        currentPage={state.currentPage}
        totalPage={qaList.length}
        style={{ margin: "32px auto", maxWidth: "768px" }}
      />

      <Controller>
        <IconButton
          ref={shuffleButtonRef}
          style={{ position: "absolute", left: 0 }}
          icon={<Shuffle />}
          color={state.shuffling ? "lightBlue" : "darkGrey"}
          onClick={() => {
            shuffleButtonRef.current?.blur();
            dispatch({ type: "toggle-shuffle" });
          }}
        />

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

        <EditButton
          onDelete={onDelete}
          onEdit={onEdit}
          style={{ position: "absolute", right: 0 }}
        />
      </Controller>
    </div>
  );
};

const CardWrapper = styled.div`
  max-width: 768px;
  position: relative;
  margin: 16px auto;
`;

const Card = styled.div<{ showAnswer: boolean; inTransition: boolean }>`
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  ${(props) =>
    props.inTransition ? "" : "transition: transform 0.2s linear;"};
  ${(props) => (props.showAnswer ? "transform: rotateY(-180deg);" : "")};

  padding-bottom: 86%;
  @media only screen and (min-width: 768px) {
    padding-bottom: 70%;
  }
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
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  &.answer {
    transform: rotateY(-180deg);
  }
  .sentence {
    font-weight: bold;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    overflow: hidden;
    pre {
      font-family: inherit;
      font-weight: bold;
      max-height: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: scroll;
      font-size: ${variables.fontSize.m};
      @media only screen and (min-width: 768px) {
        font-size: ${variables.fontSize.l};
      }
    }
  }
  .guide {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${variables.colors.darkGrey};
    color: ${variables.colors.white};
    font-size: ${variables.fontSize.xs};
    text-align: center;
    padding: 4px 0;
    border-radius: 0 0 6px 6px;
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
  border-radius: 6px 6px 0 0;
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
