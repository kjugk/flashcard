import Delete from "@material-ui/icons/Delete";
import React, { FC } from "react";
import { ArrayField, FieldErrors, UseFormMethods } from "react-hook-form";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { FlashcardFormValues } from "../../../types";
import { Box } from "../../lib";
import { IconButton } from "../../lib/icon-button";
import { Textarea } from "../../lib/textarea";
import { Title } from "../../lib/title";
import { QaState } from "../../pages/flashcard-detail/store";
import { getErrorMessage } from "./get-error-message";

interface Props {
  fields: Partial<ArrayField<QaState, "id">>[];
  register: UseFormMethods["register"];
  errors: FieldErrors<FlashcardFormValues>;
  onRemoveItem: (index: number) => void;
}

export const QaList: FC<Props> = ({
  fields,
  register,
  errors,
  onRemoveItem,
}) => {
  return (
    <QaListWrapper>
      <TransitionGroup
        component={null}
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: "qa-list-item",
          })
        }
      >
        {fields.map((field, index) => (
          <CSSTransition key={field.id} timeout={200}>
            <Box withShadow={false} tag="li" style={{ marginBottom: "16px" }}>
              <Title
                text={`カード${index + 1}`}
                size="l"
                tag="h2"
                style={{ marginBottom: "16px" }}
              />

              <Textarea
                name={`qaList[${index}].question`}
                label="問題"
                required
                defaultValue={field.question}
                rows={3}
                inputRef={register({
                  required: true,
                  maxLength: { value: 100, message: "100" },
                })}
                errorMessage={getErrorMessage(
                  errors.qaList ? errors.qaList[index]?.question : undefined
                )}
              />

              <Textarea
                name={`qaList[${index}].answer`}
                defaultValue={field.answer}
                rows={3}
                label="答え"
                required
                inputRef={register({
                  required: true,
                  maxLength: { value: 100, message: "100" },
                })}
                errorMessage={getErrorMessage(
                  errors.qaList ? errors.qaList[index]?.answer : undefined
                )}
              />

              <div style={{ textAlign: "right" }}>
                <IconButton
                  icon={<Delete />}
                  onClick={() => onRemoveItem(index)}
                  disabled={fields.length <= 1}
                />
              </div>
            </Box>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </QaListWrapper>
  );
};

const QaListWrapper = styled.ul`
  margin-top: 16px;
  padding: 0 16px;

  @media only screen and (min-width: 768px) {
    padding: 0;
  }

  .qa-list-item-enter {
    transform: translateY(-10%);
    opacity: 0;
  }

  .qa-list-item-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: opacity 200ms, transform 200ms;
  }

  .qa-list-item-exit {
    transform: translateY(0);
    opacity: 1;
  }

  .qa-list-item-exit-active {
    opacity: 0;
    transform: translateY(8%);
    transition: opacity 200ms, transform 200ms;
  }
`;
