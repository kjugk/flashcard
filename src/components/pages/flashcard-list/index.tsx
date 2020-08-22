import React, { FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FlashcardList } from "./flashcard-list";
import { getFlashcards } from "./actions";
import { Header } from "../../shared";
import { useListPageReducer } from "./store";
import { Container, Box, Button } from "../../lib/";

/**
 * カードリストページ。
 * page コンポーネントにも、DOM をもたせて OK.
 * container と presentational 的な分け方はしない
 */
export const FlashcardListPage: FunctionComponent = () => {
  const [state, dispatch] = useListPageReducer();
  const { isLoading, flashcards } = state;
  const history = useHistory();

  useEffect(() => {
    getFlashcards(dispatch);
    // eslint-disable-next-line
  }, []);

  const renderEmptyState = () => {
    return (
      <Box>
        <h2>最初の暗記カードを作成しよう</h2>
        <Button
          label="作成"
          onClick={() => history.push("/flashcard-create")}
        />
      </Box>
    );
  };

  // TODO 共通レイアウトをコンポーネント化する?
  return (
    <div>
      <Header />
      <Container tag="main" style={{ padding: "16px" }}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <div>
            {flashcards.length <= 0 && renderEmptyState()}
            {flashcards.length >= 1 && <FlashcardList items={flashcards} />}
          </div>
        )}
      </Container>
    </div>
  );
};
