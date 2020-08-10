import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { FlashcardCreateForm } from "./form";
import { createFlashcard } from "./actions";
import { Header, Footer } from "../../shared";
import { IFlashcardCreateForm } from "./types";

/**
 * カード作成ページ。
 */
export const FlashcardCreatePage: FunctionComponent = () => {
  const history = useHistory();

  const handleSubmitForm = async (values: IFlashcardCreateForm) => {
    const id = await createFlashcard(values);
    history.push(`/flashcard-detail/${id}`);
  };

  return (
    <div>
      <Header />
      <h1>Create Page</h1>
      <FlashcardCreateForm onSubmit={handleSubmitForm} />
      <Footer />
    </div>
  );
};
