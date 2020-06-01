import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { FlashcardList } from "./components/flashcard-list.component";
import { getFlashcards } from "./effects";
import { ThunkDispatch } from "redux-thunk";
import { FlashcardListPageActionTypes } from "./store/types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

/**
 * カードリストページ。
 */
const FlashcardListPage: FunctionComponent<Props> = (props) => {
  const { getFlashcards, flashcards } = props;

  useEffect(() => {
    getFlashcards();
  }, []);

  return (
    <div>
      <h1>List Page</h1>
      <FlashcardList items={flashcards} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { flashcards } = state.flashcardListPage;
  return {
    flashcards,
  };
};

const mapDispatchProps = (
  dispatch: ThunkDispatch<RootState, unknown, FlashcardListPageActionTypes>
) => ({
  getFlashcards: () => {
    dispatch(getFlashcards());
  },
});

export default connect(mapStateToProps, mapDispatchProps)(FlashcardListPage);
