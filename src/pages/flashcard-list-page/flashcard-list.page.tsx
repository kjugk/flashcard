import React, { FunctionComponent, useEffect } from "react";
import { FlashcardList } from "./components/flashcard-list.component";
import { getFlashcards } from "./effects";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { useListPageReducer } from "./store";
import { SystemMessage } from "../../shared/components/system-message";

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
