import React, { FunctionComponent, useEffect } from "react";
import { FlashcardList } from "./flashcard-list";
import { getFlashcards } from "./effects";
import { Header } from "../../shared/header";
import { Footer } from "../../shared/footer/footer";
import { useListPageReducer } from "./store";
import { SystemMessage } from "../../shared/system-message";

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
const FlashcardListPage: FunctionComponent = () => {
  const [{ flashcards, isLoading }, dispatch] = useListPageReducer();

  useEffect(() => {
    getFlashcards(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <h1>List Page</h1>
        <FlashcardList isLoading={isLoading} items={flashcards} />
        <SystemMessage />
      </main>
      <Footer />
    </div>
  );
};

export default FlashcardListPage;
