import React, { FC, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FlashcardCreateFormValues } from "../types";

interface Props {
  onSubmit: (values: FlashcardCreateFormValues) => void;
}

export const FlashcardCreateForm: FC = () => {
  const { register, control, handleSubmit, errors } = useForm<
    FlashcardCreateFormValues
  >();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "qaList",
    }
  );
  const onSubmit = handleSubmit((data) => console.log(data));

  const appendQuestion = () => {
    append({ question: "", answer: "" });
  };

  const removeQuestion = (index: number) => {
    if (fields.length <= 1) return;
    remove(index);
  };

  useEffect(() => {
    appendQuestion();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <textarea name="name" ref={register({ required: true })} />
      <input name="description" ref={register({ required: true })} />

      {fields.map((field, index) => (
        <div key={field.id}>
          <input name={`qaList[${index}].question`} ref={register()} />
          <input name={`qaList[${index}].answer`} ref={register()} />
          <button type="button" onClick={() => removeQuestion(index)}>
            remove
          </button>
        </div>
      ))}

      <button type="submit">submit</button>
      <button type="button" onClick={appendQuestion}>
        add
      </button>
    </form>
  );
};
