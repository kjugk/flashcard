import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  value: string;
  label: string;
  rows?: number;
  onChange: (v: string) => void;
  placeholder?: string;
  errorMessage?: string;
}

export const Textarea: FC<Props> = ({
  value,
  label,
  rows = 1,
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
      <StyledTextarea hasError={hasError}>
        <TextareaAutosize
          value={value}
          minRows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </StyledTextarea>

      {hasError && <div className="error">{errorMessage}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.label<{ hasError: boolean }>`
  display: block;
  margin-bottom: 16px;
  color: #333;
  ${(props) => (props.hasError ? "color: red;" : "")}
  .label-text {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: ${variables.fontSize.s};
  }
  .error {
    margin-top: 4px;
    font-size: ${variables.fontSize.s};
  }
`;

const StyledTextarea = styled.div<{ hasError: boolean }>`
  textarea {
    resize: none;
    border: 1px solid #676d71;
    font-size: ${variables.fontSize.m};
    color: inherit;
    width: 100%;
    padding: 12px 8px;
    line-height: 130%;
    ${(props) => (props.hasError ? "border-color: red;" : "")}
    &::placeholder {
      color: #aaa;
    }
  }
`;
