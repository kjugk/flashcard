import React, { FC } from "react";
import styled from "styled-components";
import { useForm, useFieldArray, FieldError } from "react-hook-form";
import { FlashcardFormValues } from "../../../global/flashcard/types";
import { Textarea } from "../../lib/textarea";
import { Box } from "../../lib/box";
import { Button } from "../../lib/button";
import { Title } from "../../lib/title";
import Delete from "@material-ui/icons/Delete";
import { Qa } from "../../pages/flashcard-detail/store";
import { TextButton } from "../../lib/text-button";
import { CSSTransitionGroup } from "react-transition-group";

interface Props {
  defaultValues?: Partial<FlashcardFormValues>;
  onSubmit: (values: FlashcardFormValues) => void;
}

export const FlashcardForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, errors, register } = useForm<
    FlashcardFormValues
  >({
    mode: "onSubmit",
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray<Qa>({
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
        <Textarea
          name="name"
          defaultValue=""
          inputRef={register({ required: true })}
          label="名前"
          placeholder="名前を入力してください"
          errorMessage={getErrorMessage(errors.name)}
        />
        <Textarea
          name="description"
          defaultValue=""
          label="説明"
          rows={3}
          inputRef={register}
          placeholder="説明を入力してください"
          errorMessage={getErrorMessage(errors.description)}
        />
      </Box>

      <QaListWrapper>
        <CSSTransitionGroup transitionName="qaList">
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

              <Textarea
                name={`qaList[${index}].question`}
                label="問題"
                defaultValue={field.question}
                rows={3}
                inputRef={register({ required: true })}
                errorMessage={getErrorMessage(
                  errors.qaList ? errors.qaList[index]?.question : undefined
                )}
              />

              <Textarea
                name={`qaList[${index}].answer`}
                defaultValue={field.answer}
                rows={3}
                label="答え"
                inputRef={register({ required: true })}
                errorMessage={getErrorMessage(
                  errors.qaList ? errors.qaList[index]?.answer : undefined
                )}
              />

              <div style={{ textAlign: "end" }}>
                <TextButton
                  onClick={() => removeQuestion(index)}
                  disabled={fields.length <= 1}
                >
                  <Delete style={{ fontSize: 24 }} />
                </TextButton>
              </div>
            </Box>
          ))}
        </CSSTransitionGroup>
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
    </form>
  );
};

const QaListWrapper = styled.ul`
  margin-top: 16px;
  @media only screen and (max-width: 767px) {
    padding: 0 16px;
  }

  .qaList-enter {
    opacity: 0.01;
  }

  .qaList-enter.qaList-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }

  .qaList-leave {
    opacity: 1;
  }

  .qaList-leave.qaList-leave-active {
    opacity: 0.01;
    transition: opacity 200ms ease-in;
  }
`;