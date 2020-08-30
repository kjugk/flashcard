import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";

interface Props {
  value: string;
  label: string;
  onChange: (v: string) => void;
  placeholder?: string;
  errorMessage?: string;
}

export const Textarea: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder,
  errorMessage,
}) => {
  const hasError = useMemo(() => {
    return errorMessage !== undefined && errorMessage !== "";
  }, [errorMessage]);

  return (
    <Wrapper hasError={hasError}>
      <div className="label-text">{label}</div>
      <StyledTextarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        hasError={hasError}
      />
      {hasError && <div className="error">{errorMessage}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.label<{ hasError: boolean }>`
  display: block;
  margin-bottom: 16px;
  ${(props) => (props.hasError ? "color: red;" : "")}
  .label-text, .error {
    font-size: ${variables.fontSize.s};
  }
`;

const StyledTextarea = styled.textarea<{ hasError: boolean }>`
  border: 2px solid #333;
  color: inherit;
  width: 100%;
  ${(props) => (props.hasError ? "border-color: red;" : "")}
`;
