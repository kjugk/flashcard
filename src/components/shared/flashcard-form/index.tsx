import React, { FC } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Textarea } from "../../lib/textarea";
import { Box } from "../../lib/box";
import { Button } from "../../lib/button";
import Add from "@material-ui/icons/Add";
import { QaState } from "../../pages/flashcard-detail/store";
import { FlashcardFormValues } from "../../../types";
import { QaList } from "./qa-list";
import { getErrorMessage } from "./get-error-message";

interface Props {
  defaultValues?: Partial<FlashcardFormValues>;
  onSubmit: (values: FlashcardFormValues) => void;
}

export const FlashcardForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, errors, register } = useForm<
    FlashcardFormValues
  >({
    mode: "onBlur",
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray<QaState>({
    control,
    name: "qaList",
  });
  const appendQuestion = () => append({ question: "", answer: "" }, false);
  const removeQuestion = (index: number) => {
    if (fields.length <= 1) return;
    remove(index);
  };
  const _onSubmit = handleSubmit((values) => onSubmit(values));

  return (
    <form onSubmit={_onSubmit} style={{ paddingBottom: "96px" }}>
      <Box withShadow={false}>
        <Textarea
          name="name"
          defaultValue=""
          required
          inputRef={register({
            required: true,
            maxLength: { value: 30, message: "30" },
          })}
          label="名前"
          placeholder="名前を入力してください"
          errorMessage={getErrorMessage(errors.name)}
        />
        <Textarea
          name="description"
          defaultValue=""
          label="説明"
          rows={3}
          inputRef={register({ maxLength: { value: 100, message: "100" } })}
          placeholder="説明を入力してください"
          errorMessage={getErrorMessage(errors.description)}
        />
      </Box>

      <QaList
        fields={fields}
        register={register}
        errors={errors}
        onRemoveItem={removeQuestion}
      />

      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Button
          label="カードを追加"
          outlined
          icon={<Add fontSize="small" />}
          size="xs"
          onClick={appendQuestion}
        />
      </div>

      <div style={{ padding: "0 16px", textAlign: "center" }}>
        <Button type="submit" label="作成" fullWidth />
      </div>
    </form>
  );
};
