import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ClosableHeader } from "../../shared/closable-header";
import { Container } from "../../lib/container";
import { FlashcardForm } from "../../shared/flashcard-form";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { useSystemContext } from "../../../global-context/system/system.provider";
import { LoadingSpinner } from "../../shared/loading-spinner";
import { Layout } from "../../shared/layout";
import { handleHttpError } from "../../utils/http-util";
import { useFlashcardListPageContext } from "../../../global-context/flashcard-list/flashcard-list.provider";
import { FlashcardFormValues } from "../../../types";

/**
 * カード編集ページ。
 */
export const FlashcardEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const [loading, setLoading] = useState(false);
  const { flashcardLisrPageDispatch } = useFlashcardListPageContext();
  const [defaultValues, setDefaultValues] = useState<
    FlashcardFormValues | undefined
  >(undefined);

  const getFlashcardDetail = async () => {
    setLoading(true);

    try {
      const { flashcard } = await flashcardRepository.find(id);
      setDefaultValues({
        name: flashcard.name,
        description: flashcard.description,
        qaList: flashcard.qaList,
      });
    } catch (e) {
      handleHttpError(e, systemDispatch);
    } finally {
      setLoading(false);
    }
  };

  const updateFlashcard = async (values: FlashcardFormValues) => {
    systemDispatch({
      type: "system/update-loading",
      payload: { loading: true, message: "更新中" },
    });

    try {
      await flashcardRepository.update(id, values);
      systemDispatch({
        type: "system/set-system-message",
        payload: {
          messageType: "info",
          message: "編集しました。",
        },
      });

      flashcardLisrPageDispatch({
        type: "flashcard-list/set-stale",
        payload: true,
      });

      history.replace(`/flashcard-detail/${id}`);
    } catch (e) {
      systemDispatch({
        type: "system/set-system-message",
        payload: {
          messageType: "error",
          message: "編集できませんでした。",
        },
      });
    } finally {
      systemDispatch({
        type: "system/update-loading",
        payload: { loading: false },
      });
    }
  };

  useEffect(() => {
    getFlashcardDetail();
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
};
