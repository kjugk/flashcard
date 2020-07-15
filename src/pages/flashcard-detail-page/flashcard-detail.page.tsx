import React, { FunctionComponent, useEffect } from "react";
import { getFlashcardDetail, deleteFlashcard } from "./effects";
import { useParams, useHistory } from "react-router-dom";
import { Header } from "../../shared/components/header/header";
import { QaViewer } from "./components/qa-viewer.component";
import { useDetailPageReducer } from "./store";
import { useSystemContext } from "../../shared/store/system";

/**
 * カードの詳細ページ。
 * 子コンポーネントの副作用を伴うaction は全てここで処理する。
 */
export const FlashcardDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const [
    { isLoading, isDeleting, flashcard },
    dispatch,
  ] = useDetailPageReducer();

  // 詳細データを取得する
  useEffect(() => {
    getFlashcardDetail(id, dispatch);
  }, [id, dispatch]);

  const onClickDeleteButton = async () => {
    // TODO modal で聞くようにする。
    if (window.confirm("削除しますか?")) {
      await deleteFlashcard(id, dispatch, systemDispatch);
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
          <button
            type="button"
            onClick={onClickDeleteButton}
            disabled={isDeleting}
          >
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
