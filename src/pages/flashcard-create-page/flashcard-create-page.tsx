import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { FlashcardCreateForm } from "./components/flashcard-create-form";
import { createFlashcard } from "./effects";

/**
 * カード作成ページ。
 */
const FlashcardCreatePage: FunctionComponent = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Create Page</h1>
      <FlashcardCreateForm
        onSubmit={async (values) => {
          const id = await createFlashcard(values);
          history.push(`/flashcard-detail/${id}`);
        }}
      />
    </div>
  );
};

export default FlashcardCreatePage;
