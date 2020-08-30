import React, { FC } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  FieldError,
} from "react-hook-form";
import { FlashcardCreateFormValues } from "../types";
import { Textarea } from "../../../lib/textarea";
import { Box } from "../../../lib/box";
import { Title } from "../../../lib/title";
import Delete from "@material-ui/icons/Delete";

interface Props {
  onSubmit: (values: FlashcardCreateFormValues) => void;
}

export const FlashcardCreateForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useForm<FlashcardCreateFormValues>({
    mode: "onSubmit",
    defaultValues: {
      qaList: [
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
    },
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
          render={({ onChange, value }) => (
            <Textarea
              value={value}
              onChange={onChange}
              label="名前"
              placeholder="名前を入力してください"
              errorMessage={getErrorMessage(errors.name)}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Textarea
              value={value}
              onChange={onChange}
              rows={3}
              label="説明"
              placeholder="説明を入力してください"
              errorMessage={getErrorMessage(errors.description)}
            />
          )}
        />
      </Box>

      <div style={{ padding: "16px" }}>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            withShadow={false}
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
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <Textarea
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
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <Textarea
                  value={value}
                  rows={3}
                  onChange={onChange}
                  label="答え"
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
      </div>

      <button type="button" onClick={appendQuestion}>
        カードを追加
      </button>

      <button type="submit">作成</button>
    </form>
  );
};
