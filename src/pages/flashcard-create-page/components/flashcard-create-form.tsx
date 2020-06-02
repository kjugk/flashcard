import React, { FunctionComponent } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  IFlashcardCreateForm,
  IFlashcardCreateFormErrors,
} from "../store/types";

export const FlashcardCreateForm: FunctionComponent = () => {
  const initialValues: IFlashcardCreateForm = {
    name: "",
    description: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: IFlashcardCreateFormErrors = {};
        if (!values.name) {
          console.log("必須");
          errors.name = "必須項目です";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // TODO call effects
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field type="text" name="name" placeholder="カードの名前" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <Field type="text" name="description" placeholder="カードの説明" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
