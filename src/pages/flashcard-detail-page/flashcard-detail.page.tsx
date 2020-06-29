import React, { FunctionComponent, useEffect, useReducer } from "react";
import { getFlashcardDetail } from "./effects";
import { useParams } from "react-router-dom";
import { Header } from "../../shared/components/header/header";
import { QaViewer } from "./components/qa-viewer.component";
import { reducer, initialState } from "./store";

/**
 * カードの詳細ページ。
 * 子コンポーネントの副作用を伴うaction は全てここで処理する。
 */
export const FlashcardDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [{ isLoading, flashcard }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    getFlashcardDetail(id, dispatch);
  }, [id]);

  return (
    <div>
      <Header />
      {isLoading && <div>Loading</div>}
      {!isLoading && flashcard && (
        <article>
          <h1>{flashcard.name}</h1>
          {flashcard.description && <p>{flashcard.description}</p>}
          <QaViewer qaList={flashcard.qaList}></QaViewer>
        </article>
      )}
      {/* <Footer /> */}
    </div>
  );
};
