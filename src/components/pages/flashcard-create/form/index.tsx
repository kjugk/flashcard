import React, { FC } from "react";
import styled from "styled-components";
import {
  useForm,
  useFieldArray,
  Controller,
  FieldError,
} from "react-hook-form";
import { FlashcardCreateFormValues } from "../types";
import { Textarea } from "../../../lib/textarea";
import { Box } from "../../../lib/box";
import { Button } from "../../../lib/button";
import { Title } from "../../../lib/title";
import Delete from "@material-ui/icons/Delete";

interface Props {
  defaultValues?: Partial<FlashcardCreateFormValues>;
  onSubmit: (values: FlashcardCreateFormValues) => void;
}

export const FlashcardCreateForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, errors, register, formState } = useForm<
    FlashcardCreateFormValues
  >({
    mode: "onSubmit",
    defaultValues,
    shouldFocusError: false,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "qaList",
  });
  const appendQuestion = () => append({ question: "", answer: "" });
  const removeQuestion = (index: number) => {
    if (fields.length <= 1) return;
    remove(index);
  };
  const _onSubmit = handleSubmit((values) => onSubmit(values));

  // TODO これ本当に必要か調べる
  const getErrorMessage = (error?: FieldError) => {
    if (error === undefined) return "";
    switch (error.type) {
      case "required":
        return "必須項目です";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={_onSubmit}>
      <Box withShadow={false}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ onChange, value, name }) => (
            <Textarea
              label="名前"
              name={name}
              value={value}
              onChange={onChange}
              placeholder="名前を入力してください"
              errorMessage={getErrorMessage(errors.name)}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ onChange, value, name }) => (
            <Textarea
              label="説明"
              name={name}
              value={value}
              onChange={onChange}
              rows={3}
              placeholder="説明を入力してください"
              errorMessage={getErrorMessage(errors.description)}
            />
          )}
        />
      </Box>

      <QaListWrapper>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            withShadow={false}
            tag="li"
            style={{ marginBottom: "16px" }}
          >
            <Title
              text={`${index + 1}`}
              size="xl"
              tag="h2"
              style={{ marginBottom: "16px" }}
            />

            <Controller
              name={`qaList[${index}].question`}
              defaultValue={
                defaultValues?.qaList
                  ? defaultValues.qaList[index].question
                  : ""
              }
              control={control}
              rules={{ required: true }}
              render={({ value, onChange, name }) => (
                <Textarea
                  name={name}
                  value={value}
                  rows={3}
                  onChange={onChange}
                  label="問題"
                  errorMessage={getErrorMessage(
                    errors.qaList ? errors.qaList[index]?.question : undefined
                  )}
                />
              )}
            />

            <Controller
              name={`qaList[${index}].answer`}
              defaultValue={
                defaultValues?.qaList ? defaultValues.qaList[index].answer : ""
              }
              control={control}
              rules={{ required: true }}
              render={({ value, onChange, name }) => (
                <Textarea
                  name={name}
                  value={value}
                  rows={3}
                  onChange={onChange}
                  label="答え"
                  inputRef={register()}
                  errorMessage={getErrorMessage(
                    errors.qaList ? errors.qaList[index]?.answer : undefined
                  )}
                />
              )}
            />

            <div style={{ textAlign: "end" }}>
              <button type="button" onClick={() => removeQuestion(index)}>
                <Delete fontSize="inherit" />
              </button>
            </div>
          </Box>
        ))}
      </QaListWrapper>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Button
          label="カードを追加"
          outlined
          size="xs"
          onClick={appendQuestion}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Button type="submit" label="作成" size="xl" />
      </div>

      {!formState.isValid && <div>エラーがあるよ</div>}
    </form>
  );
};

const QaListWrapper = styled.ul`
  margin-top: 16px;
  @media only screen and (max-width: 767px) {
    padding: 0 16px;
  }
`;
