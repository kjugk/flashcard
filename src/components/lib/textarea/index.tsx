import React, { FC } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

interface Props {
  value: string;
  label: string;
  onChange: (v: string) => void;
}

export const Textarea: FC<Props> = ({ value, label }) => {
  return (
    <label>
      <div className="label-text">{label}</div>
      <StyledTextarea value={value} />
    </label>
  );
};

const StyledTextarea = styled.textarea`
  border: 2px solid #333;
  width: 100%;
`;
