import React, { FunctionComponent, useEffect } from "react";
import { useSystemContext, useHasAnyMessage } from "../../../providers/system";

/**
 * ユーザーに通知するメッセージを表示するコンポーネント
 */
export const SystemMessage: FunctionComponent = () => {
  const { systemState, systemDispatch } = useSystemContext();
  const hasAnyMessage = useHasAnyMessage(systemState);

  function cleanupMessage() {
    systemDispatch({
      type: "set-system-info-message",
      payload: "",
    });
  }

  // TODO message を queue にする。
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
  return <div>{systemState.infoMessage}</div>;
};
