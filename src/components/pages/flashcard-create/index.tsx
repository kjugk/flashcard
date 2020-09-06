import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../shared";
import { FlashcardFormValues } from "../../../global/flashcard/types";
import { Container } from "../../lib";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { FlashcardForm } from "../../shared/flashcard-form";

/**
 * カード作成ページ。
 */
export const FlashcardCreatePage: FC = () => {
  const history = useHistory();

  const handleSubmitForm = async (values: FlashcardFormValues) => {
    // TODO error handling
    const id = await flashcardRepository.create(values);
    history.push(`/flashcard-detail/${id}`);
  };

  return (
    <div>
      <Header />
      <Container>
        <FlashcardForm
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
