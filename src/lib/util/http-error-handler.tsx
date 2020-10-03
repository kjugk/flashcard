import React from "react";
import { NotFoundError } from "../../errors";
import { SystemAction } from "../../global/system/system.store";

export const handleHttpError = (
  e: any,
  systemDispatch: React.Dispatch<SystemAction>
) => {
  if (e instanceof NotFoundError) {
    systemDispatch({
      type: "system/set-not-found-error",
      payload: true,
    });
  }
};
