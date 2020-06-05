import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { getFlashcardDetail } from "./effects";
import { ThunkDispatch } from "redux-thunk";
import { FlashcardDetailPageActionTypes } from "./store/types";
import { useParams } from "react-router-dom";
import { Header } from "../../shared/components/header/header";
import { QaViewer } from "./components/qa-viewer.component";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

/**
 * カードの詳細ページ。
 * 子コンポーネントの副作用を伴うaction は全てここで処理する。
 */
const FlashcardDetailPage: FunctionComponent<Props> = (props) => {
  const { id } = useParams<{ id: string }>();
  const { flashcard, getFlashcardDetail, isLoading } = props;

  useEffect(() => {
    console.log("detail");
    getFlashcardDetail(id);
  }, [getFlashcardDetail, id]);

  if (flashcard === undefined) {
    return null;
  }

  // TODO ページの内容を別コンポーネントに切り出すか検討する
  return (
    <div>
      <Header />
      {isLoading && <div>Loading</div>}
      {!isLoading && (
        <>
          <h1>{flashcard.name}</h1>
          {flashcard.description && <p>{flashcard.description}</p>}
          <QaViewer qaList={flashcard.qaList}></QaViewer>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { isLoading, flashcard } = state.flashcardDetailPage;
  return {
    isLoading,
    flashcard,
  };
};

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
