import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { ClosableHeader } from "../../shared/closable-header";
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
      systemDispatch({
        type: "update-loading",
        payload: { loading: true, message: "作成中" },
      });

      const id = await flashcardRepository.create(values);
      history.push(`/flashcard-detail/${id}`);
    } catch {
      // TODO エラーハンドリング
    } finally {
      systemDispatch({ type: "update-loading", payload: { loading: false } });
    }
  };

  console.log(history.location.state);

  return (
    <div>
      <ClosableHeader title="問題集の作成" />
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
