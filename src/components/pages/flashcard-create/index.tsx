import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../shared";
import { FlashcardFormValues } from "../../../global/flashcard/types";
import { Container } from "../../lib";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { FlashcardForm } from "../../shared/flashcard-form";
import { useSystemContext } from "../../../global/system/system.provider";

/**
 * カード作成ページ。
 */
export const FlashcardCreatePage: FC = () => {
  const history = useHistory();
  const { systemDispatch } = useSystemContext();

  const handleSubmitForm = async (values: FlashcardFormValues) => {
    try {
      systemDispatch({ type: "update-loading", payload: true });

      const id = await flashcardRepository.create(values);
      history.push(`/flashcard-detail/${id}`);
    } catch {
      // TODO エラーハンドリング
    } finally {
      systemDispatch({ type: "update-loading", payload: false });
    }
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
