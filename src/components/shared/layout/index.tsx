import React, { FC } from "react";
import { useSystemContext } from "../../../global-context/system/system.provider";
import { NetworkErrorPage } from "../../pages/errors/network-error";
import { NotFoundErrorPage } from "../../pages/errors/not-found-error";

export const Layout: FC = ({ children }) => {
  const { systemState } = useSystemContext();

  if (systemState.errorType === "notFound") {
    return <NotFoundErrorPage />;
  }

  if (systemState.errorType === "network") {
    return <NetworkErrorPage />;
  }

  return <>{children}</>;
};
