import React, { FunctionComponent, useEffect } from "react";
import { FlashcardList } from "./flashcard-list";
import { getFlashcards } from "./actions";
import { Header } from "../../shared";
import { useListPageReducer } from "./store";
import { Container } from "../../lib/";
import { EmptyState } from "./empty-state";
import { Title } from "../../lib/title";

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

  return (
    <div>
      <Header />
      <Container tag="main" style={{ padding: "16px" }}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            <Title
              text="カード一覧"
              tag="h1"
              size="xl"
              style={{ marginBottom: "16px" }}
            />
            {flashcards.length <= 0 && <EmptyState />}
            {flashcards.length >= 1 && <FlashcardList items={flashcards} />}
          </>
        )}
      </Container>
    </div>
  );
};
