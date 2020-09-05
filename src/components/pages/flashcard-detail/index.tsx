import React, { FunctionComponent, useEffect, useState } from "react";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { useParams, useHistory } from "react-router-dom";
import { useDetailPageReducer } from "./store";
import { useSystemContext } from "../../../global/system/system.provider";
import { Header } from "../../shared";
import { QaViewer } from "./qa-viewer";
import { Title } from "../../lib/title";
import { Button } from "../../lib/button";
import { Container } from "../../lib/container";
import { variables } from "../../../styles/variables";
import { ConfirmableModal } from "../../lib/confirmable-modal";

/**
 * カードの詳細ページ。
 * 子コンポーネントの副作用を伴うaction は全てここで処理する。
 */
export const FlashcardDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const [state, dispatch] = useDetailPageReducer();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const getFlashcardDetail = async () => {
    try {
      const item = await flashcardRepository.find(id);
      dispatch({
        type: "store-flashcard-detail",
        payload: item,
      });
      setLoading(false);
    } catch (e) {
      // TODO グローバルのエラーハンドラーにエラー渡す
      setLoading(false);
      history.replace("/not-found");
    }
  };

  const deleteFlashcard = async () => {
    setDeleting(true);

    try {
      await flashcardRepository.delete(id);
      systemDispatch({
        type: "set-system-message",
        payload: {
          messageType: "info",
          message: "削除しました。",
        },
      });

      setDeleting(false);
      history.replace("/flashcard-list");
    } catch {
      setDeleting(false);

      // エラーの種類で処理を分岐させる
      systemDispatch({
        type: "set-system-message",
        payload: {
          messageType: "error",
          message: "削除できませんでした。",
        },
      });
    }
  };

  // 詳細データを取得する
  useEffect(() => {
    getFlashcardDetail();
  }, []);

  const closeModal = () => setShowDeleteConfirmModal(false);
  const handleClickDeleteButton = () => setShowDeleteConfirmModal(true);
  const handleConfirmDelete = deleteFlashcard;
  const { flashcard } = state;

  return (
    <div>
      <Header />
      <Container
        tag="main"
        style={{ padding: "16px", background: variables.colors.white }}
      >
        {loading && <div>Loading</div>}
        {!loading && flashcard && (
          <>
            <Title text={flashcard.name} tag="h1" size="xl" />

            <button
              type="button"
              onClick={handleClickDeleteButton}
              disabled={deleting}
            >
              delete
            </button>

            <QaViewer qaList={flashcard.qaList}></QaViewer>

            {flashcard.description && <p>{flashcard.description}</p>}

            <div style={{ textAlign: "center", margin: "24px 0" }}>
              <Button
                label="カード追加・編集"
                size="xl"
                outlined
                onClick={() => {
                  history.push(`/flashcard-edit/${id}`);
                }}
              />
            </div>
          </>
        )}
      </Container>

      <ConfirmableModal
        show={showDeleteConfirmModal}
        title="削除しますがよろしいですか"
        description="一度削除したものは復元出来ません"
        submitLabel="削除"
        onClose={closeModal}
        onCancel={closeModal}
        onSubmit={handleConfirmDelete}
      />
    </div>
  );
};
