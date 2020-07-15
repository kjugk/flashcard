import React, { FunctionComponent, useEffect, useReducer } from "react";
import { getFlashcardDetail, deleteFlashcard } from "./effects";
import { useParams, useHistory } from "react-router-dom";
import { Header } from "../../shared/components/header/header";
import { QaViewer } from "./components/qa-viewer.component";
import { reducer, initialState } from "./store";

/**
 * カードの詳細ページ。
 * 子コンポーネントの副作用を伴うaction は全てここで処理する。
 */
export const FlashcardDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [{ isLoading, flashcard }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    getFlashcardDetail(id, dispatch);
  }, [id]);

  const onClickDeleteButton = async () => {
    // TODO modal で聞くようにする。
    if (window.confirm("削除しますか?")) {
      await deleteFlashcard(id, dispatch);
      history.replace("/");
    }
  };

  return (
    <div>
      <Header />
      {isLoading && <div>Loading</div>}
      {!isLoading && flashcard && (
        <article>
          <h1>{flashcard.name}</h1>
          <button type="button" onClick={onClickDeleteButton}>
            delete
          </button>
          {flashcard.description && <p>{flashcard.description}</p>}
          <QaViewer qaList={flashcard.qaList}></QaViewer>
        </article>
      )}
      {/* <Footer /> */}
    </div>
  );
};
