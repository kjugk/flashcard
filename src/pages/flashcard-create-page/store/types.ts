// State types
export interface FlashcardCreatePageState {
  form: {
    name: string;
  };
}

export interface IFlashcardCreateForm {
  name: string;
  description: string;
}

export interface IFlashcardCreateFormErrors {
  name?: string;
  description?: string;
}

// Action types
export const UPDATE_NAME = "UPDATE_NAME";
interface UpdateNameAction {
  type: typeof UPDATE_NAME;
  payload: string;
}

export type FlashcardCreatePageActionTypes = UpdateNameAction;
