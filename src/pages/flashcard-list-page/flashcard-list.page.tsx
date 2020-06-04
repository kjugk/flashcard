import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { FlashcardList } from "./components/flashcard-list.component";
import { getFlashcards } from "./effects";
import { ThunkDispatch } from "redux-thunk";
import { FlashcardListPageActionTypes } from "./store/types";
import { Header } from "../../shared/components/header/header";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

/**
 * カードリストページ。
 */
const FlashcardListPage: FunctionComponent<Props> = (props) => {
  const { getFlashcards, flashcards, isDirty } = props;

  useEffect(() => {
    if (isDirty) {
      getFlashcards();
    }
  }, [isDirty]);

  return (
    <div>
      <Header />
      <h1>List Page</h1>
      <FlashcardList items={flashcards} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { flashcards, isDirty } = state.flashcardListPage;
  return {
    isDirty,
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
