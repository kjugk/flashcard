import React, { FunctionComponent, useEffect, useState } from "react";
import { FlashcardList } from "./flashcard-list";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { Header } from "../../shared";
import { useListPageReducer } from "./store";
import { Container } from "../../lib/";
import { EmptyState } from "./empty-state";
import { Title } from "../../lib/title";
import { LoadingSpinner } from "../../shared/loading-spinner";
import { Layout } from "../../shared/layout";
import { handleHttpError } from "../../../lib/util/http-error-handler";
import { useSystemContext } from "../../../global/system/system.provider";

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
export const FlashcardListPage: FunctionComponent = () => {
  const [{ flashcards }, dispatch] = useListPageReducer();
  const [loading, setLoading] = useState(true);
  const { systemDispatch } = useSystemContext();

  const getFlashcards = async () => {
    try {
      const list = await flashcardRepository.getAll();
      dispatch({
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
