// State types

export interface IFlashcardCreateForm {
  name: string;
  description: string;
  qaList: {
    question: string;
    answer: string;
  }[];
}

export interface IFlashcardCreateFormErrors {
  name?: string;
  description?: string;
  qaList?: { [index: number]: string }[];
}

// Action types
export const UPDATE_NAME = "UPDATE_NAME";
interface UpdateNameAction {
  type: typeof UPDATE_NAME;
  payload: string;
}

export type FlashcardCreatePageActionTypes = UpdateNameAction;
