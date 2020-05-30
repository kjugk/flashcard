import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { getFlashcardDetail } from "./effects";
import { ThunkDispatch } from "redux-thunk";
import { FlashcardDetailPageActionTypes } from "./store/types";
import { useParams } from "react-router-dom";

/**
 * カードの詳細ページ。
 */
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const FlashcardDetailPage: FunctionComponent<Props> = (props) => {
  const { id } = useParams<{ id: string }>();
  const { flashcard, getFlashcardDetail } = props;

  useEffect(() => {
    getFlashcardDetail(id);
  }, []);

  if (flashcard === undefined) {
    return null;
  }

  return <div>{flashcard.name}</div>;
};

const mapStateToProps = (state: RootState) => ({
  flashcard: state.flashcardDetailPage.flashcard,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, unknown, FlashcardDetailPageActionTypes>
) => ({
  getFlashcardDetail: (id: string) => {
    dispatch(getFlashcardDetail(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardDetailPage);
