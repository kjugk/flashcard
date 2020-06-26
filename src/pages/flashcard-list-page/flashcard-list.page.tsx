import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { FlashcardList } from "./components/flashcard-list.component";
import { getFlashcards } from "./effects";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../shared/components/header/header";
import { Action } from "redux";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
const FlashcardListPage: FunctionComponent<Props> = (props) => {
  const { getFlashcards, flashcards, isDirty, isLoading } = props;

  useEffect(() => {
    if (!isDirty) return;

    getFlashcards();
  }, [isDirty, getFlashcards]);

  return (
    <div>
      <Header />
      <h1>List Page</h1>
      <FlashcardList isLoading={isLoading} items={flashcards} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { flashcards, isDirty, isLoading } = state.flashcardListPage;
  return {
    isLoading,
    isDirty,
    flashcards,
  };
};

const mapDispatchProps = (
  dispatch: ThunkDispatch<RootState, unknown, Action<string>>
) => ({
  getFlashcards: () => {
    dispatch(getFlashcards());
  },
});

export default connect(mapStateToProps, mapDispatchProps)(FlashcardListPage);
