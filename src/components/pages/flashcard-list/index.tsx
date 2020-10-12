import React, { FunctionComponent, useEffect, useState } from "react";
import { FlashcardList } from "./flashcard-list";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { Header } from "../../shared";
import { Container } from "../../lib/";
import { EmptyState } from "./empty-state";
import { Title } from "../../lib/title";
import { LoadingSpinner } from "../../shared/loading-spinner";
import { Layout } from "../../shared/layout";
import { handleHttpError } from "../../utils/http-util";
import { useSystemContext } from "../../../global/system/system.provider";
import { useFlashcardListPageContext } from "../../../global/flashcard-list/flashcard-list.provider";

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
export const FlashcardListPage: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const { systemDispatch } = useSystemContext();
  const {
    flashcardListPageState,
    flashcardLisrPageDispatch,
  } = useFlashcardListPageContext();

  const { flashcards, stale } = flashcardListPageState;

  const getFlashcards = async () => {
    if (!stale) return;
    setLoading(true);

    try {
      const list = await flashcardRepository.getAll();
      flashcardLisrPageDispatch({
        type: "store-flashcards",
        payload: list,
      });
      setLoading(false);
    } catch (e) {
      handleHttpError(e, systemDispatch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlashcards();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div>
        <Header />
        <LoadingSpinner show={loading} />

        {!loading && (
          <Container tag="main" style={{ padding: "16px" }}>
            <Title
              text="問題集一覧"
              tag="h1"
              size="l"
              style={{ marginBottom: "16px" }}
            />
            {flashcards.length <= 0 && <EmptyState />}
            {flashcards.length >= 1 && <FlashcardList items={flashcards} />}
          </Container>
        )}
      </div>
    </Layout>
  );
};
