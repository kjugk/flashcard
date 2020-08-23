import React, { FunctionComponent, useEffect } from "react";
import { useSystemContext } from "../../../global/provider/system.provider";
import { useHasAnyMessage } from "../../../global/store/system.store";

/**
 * ユーザーに通知するメッセージを表示するコンポーネント
 */
export const SystemMessage: FunctionComponent = () => {
  const { systemState, systemDispatch } = useSystemContext();
  const hasAnyMessage = useHasAnyMessage(systemState);

  function cleanupMessage() {
    systemDispatch({
      type: "cleanup-message",
    });
  }

  // TODO message を queue にする。
  // 消す時に、messageID をしてする。
  useEffect(() => {
    if (hasAnyMessage) {
      setTimeout(cleanupMessage, 2000);
    }

    return () => {
      // メッセージが残ってたら削除する。
      if (hasAnyMessage) cleanupMessage();
    };
    // eslint-disable-next-line
  }, [hasAnyMessage]);

  if (!hasAnyMessage) return null;

  // TODO messege の種類でスタイル出し分ける
  return <div>{systemState.message}</div>;
};
