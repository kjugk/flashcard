import React, { FunctionComponent, useEffect } from "react";
import { FlashcardList } from "./flashcard-list";
import { getFlashcards } from "./actions";
import { Header, Footer } from "../../shared";
import { useListPageReducer } from "./store";

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
export const FlashcardListPage: FunctionComponent = () => {
  const [state, dispatch] = useListPageReducer();
  const { isLoading, flashcards } = state;

  useEffect(() => {
    getFlashcards(dispatch);
  }, [dispatch]);

  // TODO 共通レイアウトをコンポーネント化する?
  return (
    <div>
      <Header />
      <main>
        <h1>List Page</h1>
        <FlashcardList isLoading={isLoading} items={flashcards} />
      </main>
      <Footer />
    </div>
  );
};
