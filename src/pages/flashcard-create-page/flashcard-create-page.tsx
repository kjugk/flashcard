import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { FlashcardCreateForm } from "./components/flashcard-create-form";
import { createFlashcard } from "./effects";
import { Header } from "../../shared/components/header/header";
import { useList } from "../flashcard-list-page/store";

/**
 * カード作成ページ。
 */
const FlashcardCreatePage: FunctionComponent = () => {
  const history = useHistory();
  const { state, dispatch } = useList();

  return (
    <div>
      <Header />
      <h1>Create Page</h1>
      <FlashcardCreateForm
        onSubmit={async (values) => {
          const id = await createFlashcard(values, dispatch);
          history.push(`/flashcard-detail/${id}`);
        }}
      />
    </div>
  );
};

export default FlashcardCreatePage;
