import React, { FC } from "react";
import { useSystemContext } from "../../../global-context/system/system.provider";
import { NetworkErrorPage } from "../../pages/errors/network-error";
import NotFoundErrorPage from "../../pages/errors/not-found-error";

export const HttpErrorBoundary: FC = ({ children }) => {
  const { systemState } = useSystemContext();
  const { errorType } = systemState;

  if (errorType === "notFound" || errorType === "permission") {
    return <NotFoundErrorPage />;
  }

  if (errorType === "network") {
    return <NetworkErrorPage />;
  }

  return <>{children}</>;
};
