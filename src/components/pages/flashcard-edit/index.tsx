import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ClosableHeader } from "../../shared/closable-header";
import { Container } from "../../lib/container";
import { FlashcardForm } from "../../shared/flashcard-form";
import { FlashcardFormValues } from "../../../global/flashcard/types";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { useSystemContext } from "../../../global/system/system.provider";
import { LoadingSpinner } from "../../shared/loading-spinner";

/**
 * カード編集ページ。
 */
export const FlashcardEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<
    FlashcardFormValues | undefined
  >(undefined);

  const getFlashcardDetail = async () => {
    try {
      setLoading(true);
      const item = await flashcardRepository.find(id);
      setDefaultValues({
        name: item.name,
        description: item.description,
        qaList: item.qaList,
      });
    } catch {
      // TODO コンテンツ置き換えるだけにする
    } finally {
      setLoading(false);
    }
  };

  const updateFlashcard = async (values: FlashcardFormValues) => {
    try {
      systemDispatch({
        type: "update-loading",
        payload: { loading: true, message: "更新中" },
      });

      await flashcardRepository.update(id, values);
      systemDispatch({
        type: "set-system-message",
        payload: {
          messageType: "info",
          message: "編集しました。",
        },
      });
      history.replace(`/flashcard-detail/${id}`);
    } catch (e) {
      console.error(e);
    } finally {
      systemDispatch({ type: "update-loading", payload: { loading: false } });
    }
  };

  useEffect(() => {
    getFlashcardDetail();
  }, []);

  return (
    <div>
      <ClosableHeader title="問題集の編集" />
      <LoadingSpinner show={loading} />
      {!loading && (
        <Container>
          <FlashcardForm
            defaultValues={defaultValues}
            onSubmit={updateFlashcard}
          />
        </Container>
      )}
    </div>
  );
};
