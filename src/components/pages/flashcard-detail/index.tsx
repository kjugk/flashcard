import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { flashcardRepository } from "../../../repositories/flashcard/flashcard-repository";
import { useParams, useHistory } from "react-router-dom";
import { useDetailPageReducer } from "./store";
import { useSystemContext } from "../../../global/system/system.provider";
import { ClosableHeader } from "../../shared/closable-header";
import { QaViewer } from "./qa-viewer";
import { Title } from "../../lib/title";
import { Container } from "../../lib/container";
import { variables } from "../../../styles/variables";
import { Controller } from "./controller";
import { LoadingSpinner } from "../../shared/loading-spinner";

/**
 * カードの詳細ページ。
 * 子コンポーネントの副作用を伴うaction は全てここで処理する。
 */
export const FlashcardDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { systemDispatch } = useSystemContext();
  const [state, dispatch] = useDetailPageReducer();
  const [loading, setLoading] = useState(true);

  const getFlashcardDetail = async () => {
    setLoading(true);

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
    try {
      systemDispatch({
        type: "update-loading",
        payload: { loading: true, message: "削除中" },
      });

      await flashcardRepository.delete(id);

      systemDispatch({
        type: "set-system-message",
        payload: {
          messageType: "info",
          message: "削除しました。",
        },
      });

      history.replace("/flashcard-list");
    } catch {
      // エラーの種類で処理を分岐させる
      systemDispatch({
        type: "set-system-message",
        payload: {
          messageType: "error",
          message: "削除できませんでした。",
        },
      });
    } finally {
      systemDispatch({ type: "update-loading", payload: { loading: false } });
    }
  };

  // 詳細データを取得する
  useEffect(() => {
    getFlashcardDetail();
  }, []);

  const { flashcard } = state;

  return (
    <div>
      <ClosableHeader title="問題集" />
      <LoadingSpinner show={loading} />

      {!loading && flashcard && (
        <Container
          tag="main"
          style={{ padding: "16px", background: variables.colors.white }}
        >
          <TitleWrapper>
            <Title
              text={flashcard.name}
              tag="h1"
              size="xxl"
              style={{ flex: 1 }}
            />

            <Controller
              onEdit={() => history.push(`/flashcard-edit/${id}`)}
              onDelete={deleteFlashcard}
            />
          </TitleWrapper>

          <QaViewer qaList={flashcard.qaList} />

          {flashcard.description && <p>{flashcard.description}</p>}
        </Container>
      )}
    </div>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;
