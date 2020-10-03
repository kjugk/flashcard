import React, { FC } from "react";
import { useSystemContext } from "../../../global/system/system.provider";
import { NotFound } from "../not-found";

export const Layout: FC = ({ children }) => {
  const { systemState } = useSystemContext();

  if (systemState.hasNotFoundError) {
    return <NotFound />;
  }

  return <>{children}</>;
};
