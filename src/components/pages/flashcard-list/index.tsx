import React, { FunctionComponent, useEffect } from "react";
import { FlashcardList } from "./flashcard-list";
import { getFlashcards } from "./actions";
import { Header } from "../../shared";
import { useListPageReducer } from "./store";
import { Container } from "../../lib/";

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
    // eslint-disable-next-line
  }, []);

  // TODO 共通レイアウトをコンポーネント化する?
  return (
    <div>
      <Header />
      <Container tag="main">
        <h1>List Page</h1>
        <FlashcardList isLoading={isLoading} items={flashcards} />
      </Container>
    </div>
  );
};
