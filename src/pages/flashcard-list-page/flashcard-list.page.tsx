import React, { FunctionComponent, useEffect } from "react";
import { FlashcardList } from "./components/flashcard-list.component";
import { getFlashcards } from "./effects";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";
import { useList } from "./store";

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
const FlashcardListPage: FunctionComponent = () => {
  const { state, dispatch } = useList();
  const { flashcards, isDirty, isLoading } = state;

  useEffect(() => {
    if (isDirty) {
      getFlashcards(dispatch);
    }
  }, [isDirty, dispatch]);

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

export default FlashcardListPage;
