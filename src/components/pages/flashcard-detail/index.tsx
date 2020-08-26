import React, { FunctionComponent, useEffect, useState } from "react";
import { getFlashcardDetail, deleteFlashcard } from "./actions";
import { useParams, useHistory } from "react-router-dom";
import { useDetailPageReducer } from "./store";
import { useSystemContext } from "../../../global/provider/system.provider";
import { Header } from "../../shared";
import { QaViewer } from "./qa-viewer";
import { Title } from "../../lib/title";
import { Container, Button } from "../../lib";
import { Modal } from "../../lib/modal";

/**
 * カードの詳細ページ。
 * 子コンポーネントの副作用を伴うaction は全てここで処理する。
 */
export const FlashcardDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const [
    { isLoading, isDeleting, flashcard },
    dispatch,
  ] = useDetailPageReducer();
  const [showModal, setShowModal] = useState(false);

  // 詳細データを取得する
  useEffect(() => {
    const get = async () => {
      try {
        await getFlashcardDetail(id, dispatch);
      } catch {
        history.replace("/not-found");
      }
    };
    get();
  }, [id, dispatch, history]);

  const closeModal = () => setShowModal(false);
  const handleClickDeleteButton = () => setShowModal(true);
  const handleConfirmDelete = async () => {
    try {
      await deleteFlashcard(id, dispatch, systemDispatch);
      history.replace("/flashcard-list");
    } catch (e) {
      systemDispatch({
        type: "set-system-message",
        payload: {
          messageType: "error",
          message: "削除できませんでした。",
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <Container tag="main" style={{ padding: "16px", background: "#FFF" }}>
        {isLoading && <div>Loading</div>}
        {!isLoading && flashcard && (
          <>
            <Title text={flashcard.name} tag="h1" size="xl" />

            <button
              type="button"
              onClick={handleClickDeleteButton}
              disabled={isDeleting}
            >
              delete
            </button>

            <QaViewer qaList={flashcard.qaList}></QaViewer>

            {flashcard.description && <p>{flashcard.description}</p>}
          </>
        )}
      </Container>

      <Modal show={showModal} onClose={closeModal}>
        <div>
          <Title text="削除しますがよろしいですか?" tag="h2" size="xl" />
          <div>一度削除したものは復元出来ません</div>
          <div>
            <Button label="キャンセル" onClick={closeModal} />
            <Button label="削除" onClick={handleConfirmDelete} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
