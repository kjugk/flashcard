import React, { FunctionComponent } from "react";

interface Props {
  value: string;
}

export const TextField: FunctionComponent<Props> = ({ value }) => {
  return <input type="text" value={value} />;
};
