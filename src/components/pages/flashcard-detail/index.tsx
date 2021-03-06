import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFlashcardListPageContext } from "../../../global-context/flashcard-list/flashcard-list.provider";
import { useSystemContext } from "../../../global-context/system/system.provider";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { variables } from "../../../styles/variables";
import { Container } from "../../lib/container";
import { Title } from "../../lib/title";
import { ClosableHeader } from "../../shared/closable-header";
import { HttpErrorBoundary } from "../../shared/error-boundary/http-error-boundary";
import { LoadingSpinner } from "../../shared/loading-spinner";
import { handleHttpError } from "../../utils/http-util";
import { QaViewer } from "./qa-viewer";
import { useDetailPageReducer } from "./store";

/**
 * カードの詳細ページ。
 */
export const FlashcardDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const [state, dispatch] = useDetailPageReducer();
  const { flashcardLisrPageDispatch } = useFlashcardListPageContext();
  const [loading, setLoading] = useState(true);

  const getFlashcardDetail = async () => {
    setLoading(true);

    try {
      const response = await flashcardRepository.find(id);
      dispatch({
        type: "flashcard-detail/receive-flashcard-detail",
        payload: response,
      });
    } catch (e) {
      handleHttpError(e, systemDispatch);
    } finally {
      setLoading(false);
    }
  };

  const deleteFlashcard = async () => {
    systemDispatch({
      type: "system/update-loading",
      payload: { loading: true, message: "削除中" },
    });

    try {
      await flashcardRepository.delete(id);

      systemDispatch({
        type: "system/set-system-message",
        payload: {
          messageType: "info",
          message: "削除しました。",
        },
      });

      flashcardLisrPageDispatch({
        type: "flashcard-list/set-stale",
        payload: true,
      });

      history.replace("/flashcard-list");
    } catch {
      systemDispatch({
        type: "system/set-system-message",
        payload: {
          messageType: "error",
          message: "削除できませんでした。",
        },
      });
    } finally {
      systemDispatch({
        type: "system/update-loading",
        payload: { loading: false },
      });
    }
  };

  const handleClose = () => {
    history.replace("/flashcard-list");
  };

  // 詳細データを取得する
  useEffect(() => {
    getFlashcardDetail();
  }, []);

  const { flashcard } = state;

  return (
    <HttpErrorBoundary>
      <div style={{ paddingBottom: "96px" }}>
        <ClosableHeader title="問題集" onClose={handleClose} />
        <LoadingSpinner show={loading} />

        {!loading && flashcard && (
          <Container
            tag="main"
            style={{ padding: "16px", background: variables.colors.white }}
          >
            <Title text={flashcard.name} tag="h1" size="l" />

            <QaViewer
              qaList={flashcard.qaList}
              onEdit={() => history.push(`/flashcard-edit/${id}`)}
              onDelete={deleteFlashcard}
            />

            {flashcard.description && <p>{flashcard.description}</p>}
          </Container>
        )}
      </div>
    </HttpErrorBoundary>
  );
};
