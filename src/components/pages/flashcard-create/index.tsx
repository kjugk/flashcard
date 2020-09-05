import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../shared";
import { FlashcardCreateFormValues } from "./types";
import { Container } from "../../lib";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { FlashcardCreateForm } from "./form";

/**
 * カード作成ページ。
 */
export const FlashcardCreatePage: FC = () => {
  const history = useHistory();

  const handleSubmitForm = async (values: FlashcardCreateFormValues) => {
    const id = await flashcardRepository.create(values);
    history.push(`/flashcard-detail/${id}`);
  };

  return (
    <div>
      <Header />
      <Container>
        <FlashcardCreateForm
          onSubmit={handleSubmitForm}
          defaultValues={{
            qaList: [
              { question: "", answer: "" },
              { question: "", answer: "" },
            ],
          }}
        />
      </Container>
    </div>
  );
};
