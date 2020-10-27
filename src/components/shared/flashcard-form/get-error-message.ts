import { FieldError } from "react-hook-form";

export const getErrorMessage = (error?: FieldError) => {
  if (error === undefined) return "";

  switch (error.type) {
    case "required":
      return "必須項目です";
    case "maxLength":
      return `${error.message}文字以内で入力してください`;
    default:
      return "";
  }
};
