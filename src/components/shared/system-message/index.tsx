import React, { FunctionComponent, useEffect } from "react";
import { useSystemContext } from "../../../providers/system";

/**
 * ユーザーに通知するメッセージを表示するコンポーネント
 */
export const SystemMessage: FunctionComponent = () => {
  const { systemState, systemDispatch } = useSystemContext();
  const { infoMessage } = systemState;

  function cleanupMessage() {
    systemDispatch({
      type: "set-system-info-message",
      payload: "",
    });
  }

  // TODO message を queue にする。
  useEffect(() => {
    if (infoMessage !== "") {
      setTimeout(cleanupMessage, 2000);
    }

    return () => {
      // メッセージが残ってたら削除する。
      if (infoMessage !== "") cleanupMessage();
    };
    // eslint-disable-next-line
  }, [infoMessage, systemDispatch]);

  if (systemState.infoMessage === "") return null;
  return <div>{systemState.infoMessage}</div>;
};
