import React, { FunctionComponent } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { IFlashcardCreateForm, IFlashcardCreateFormErrors } from "../types";
import { Box } from "../../../lib";

interface Props {
  onSubmit: (params: IFlashcardCreateForm) => void;
}

export const FlashcardCreateForm: FunctionComponent<Props> = (props) => {
  const initialValues: IFlashcardCreateForm = {
    name: "",
    description: "",
    qaList: [
      {
        question: "",
        answer: "",
      },
    ],
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: IFlashcardCreateFormErrors = {};
        if (!values.name) {
          errors.name = "必須項目です";
        }
        // TODO QA が一つ以上存在する
        return errors;
      }}
      onSubmit={(values) => {
        props.onSubmit(values);
      }}
    >
      {({ values }) => (
        <Form>
          <Box>
            <div>
              <Field type="text" name="name" placeholder="カードの名前" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <Field
                type="text"
                name="description"
                placeholder="カードの説明"
              />
            </div>
          </Box>

          <FieldArray
            name="qaList"
            render={(arrayHelpers) => (
              <div>
                {values.qaList.map((qa, index) => (
                  <Box key={index} style={{ marginBottom: "16px" }}>
                    <Field name={`qaList.${index}.question`} type="text" />
                    <Field name={`qaList.${index}.answer`} type="text" />
                    <button
                      type="button"
                      disabled={values.qaList.length <= 1}
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                  </Box>
                ))}
                <button
                  type="button"
                  disabled={values.qaList.length >= 5}
                  onClick={() => {
                    arrayHelpers.push({ question: "", answer: "" });
                  }}
                >
                  add
                </button>
              </div>
            )}
          />
          <button type="submit">submit</button>
        </Form>
      )}
    </Formik>
  );
};
