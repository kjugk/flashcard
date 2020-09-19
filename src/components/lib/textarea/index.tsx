import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { variables } from "../../../styles/variables";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  name: string;
  label: string;
  inputRef: (ref: HTMLTextAreaElement) => void;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  errorMessage?: string;
}

export const Textarea: FC<Props> = ({
  name,
  label,
  inputRef,
  defaultValue,
  rows = 1,
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
          name={name}
          defaultValue={defaultValue}
          ref={inputRef}
          minRows={rows}
          placeholder={placeholder}
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
    font-size: ${variables.fontSize.m};
  }
  .error {
    margin-top: 4px;
    font-size: ${variables.fontSize.m};
  }
`;

const StyledTextarea = styled.div<{ hasError: boolean }>`
  textarea {
    resize: none;
    border: 1px solid #676d71;
    font-size: ${variables.fontSize.l};
    color: inherit;
    width: 100%;
    padding: 12px 8px;
    ${(props) => (props.hasError ? "border-color: red;" : "")}
    &::placeholder {
      color: #aaa;
    }
  }
`;
