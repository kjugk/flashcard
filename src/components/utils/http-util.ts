import { Dispatch } from "react";
import { NotFoundError, NetworkError } from "../../lib/errors";
import { SystemAction } from "../../global-context/system/system.store";

export const handleHttpError = (
  e: any,
  systemDispatch: Dispatch<SystemAction>
) => {
  if (e instanceof NotFoundError) {
    systemDispatch({
      type: "system/set-system-error",
      payload: "notFound",
    });
    return;
  }

  if (e instanceof NetworkError) {
    systemDispatch({
      type: "system/set-system-error",
      payload: "network",
    });
    return;
  }

  // Not Authorized は ログインページに遷移させる

  // ここで処理しないエラーを再送する
  throw e;
};
