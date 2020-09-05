import React, { FunctionComponent, useEffect, useState } from "react";
import { FlashcardList } from "./flashcard-list";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { Header } from "../../shared";
import { useListPageReducer } from "./store";
import { Container } from "../../lib/";
import { EmptyState } from "./empty-state";
import { Title } from "../../lib/title";
import { FlashcardListPlaceholder } from "./placeholder";

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
export const FlashcardListPage: FunctionComponent = () => {
  const [{ flashcards }, dispatch] = useListPageReducer();
  const [loading, setLoading] = useState(true);

  const getFlashcards = async () => {
    try {
      const list = await flashcardRepository.getAll();
      dispatch({
        type: "store-flashcards",
        payload: list,
      });
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlashcards();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <Container tag="main" style={{ padding: "16px" }}>
        <Title
          text="カード一覧"
          tag="h1"
          size="xl"
          style={{ marginBottom: "16px" }}
        />
        {loading && <FlashcardListPlaceholder />}
        {!loading && (
          <>
            {flashcards.length <= 0 && <EmptyState />}
            {flashcards.length >= 1 && <FlashcardList items={flashcards} />}
          </>
        )}
      </Container>
    </div>
  );
};
