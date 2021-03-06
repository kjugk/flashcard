import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { ClosableHeader } from "../../shared/closable-header";
import { Container } from "../../lib";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { FlashcardForm } from "../../shared/flashcard-form";
import { useSystemContext } from "../../../global-context/system/system.provider";
import { useFlashcardListPageContext } from "../../../global-context/flashcard-list/flashcard-list.provider";
import { FlashcardFormValues } from "../../../types";

/**
 * カード作成ページ。
 */
export const FlashcardCreatePage: FC = () => {
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const { flashcardLisrPageDispatch } = useFlashcardListPageContext();

  const handleSubmitForm = async (values: FlashcardFormValues) => {
    try {
      systemDispatch({
        type: "system/update-loading",
        payload: { loading: true, message: "作成中" },
      });

      const id = await flashcardRepository.create(values);
      systemDispatch({
        type: "system/set-system-message",
        payload: {
          messageType: "info",
          message: "作成しました。",
        },
      });

      flashcardLisrPageDispatch({
        type: "flashcard-list/set-stale",
        payload: true,
      });

      history.replace(`/flashcard-detail/${id}`);
    } catch {
      systemDispatch({
        type: "system/set-system-message",
        payload: {
          messageType: "error",
          message: "作成できませんでした。",
        },
      });
    } finally {
      systemDispatch({
        type: "system/update-loading",
        payload: { loading: false },
      });
    }
  };

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
