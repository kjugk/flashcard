import React, { FunctionComponent } from "react";

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FunctionComponent<Props> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
