import React, { FunctionComponent, useEffect, useState } from "react";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { useParams, useHistory } from "react-router-dom";
import { useDetailPageReducer } from "./store";
import { useSystemContext } from "../../../global/system/system.provider";
import { ClosableHeader } from "../../shared/closable-header";
import { QaViewer } from "./qa-viewer";
import { Title } from "../../lib/title";
import { Container } from "../../lib/container";
import { variables } from "../../../styles/variables";
import { LoadingSpinner } from "../../shared/loading-spinner";
import { Layout } from "../../shared/layout";
import { handleHttpError } from "../../utils/http-util";
import { useFlashcardListPageContext } from "../../../global/flashcard-list/flashcard-list.provider";

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
      const item = await flashcardRepository.find(id);
      dispatch({
        type: "store-flashcard-detail",
        payload: item,
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
        type: "set-stale",
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
    <Layout>
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
    </Layout>
  );
};
