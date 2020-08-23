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
